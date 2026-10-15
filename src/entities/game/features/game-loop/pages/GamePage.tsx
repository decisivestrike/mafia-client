'use client';

import { useQuery } from '@tanstack/react-query';
import { Skull, HatGlasses } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import styles from './game-page.module.css';
import { getLobbyOptions } from '@/entities/game/api/get-by-id';
import { useGameIdStore } from '@/entities/user/model/status-store/useUserStatusStore';
import { tokenService } from '@/shared/api';
import { HttpError } from '@/shared/api/query';
import { BASE_URL } from '@/shared/env';
import { cn } from '@/shared/lib/utils';
import { Spinner } from '@/shared/ui';
import { CenterBox } from '@/shared/ui/CenterBox/CenterBox';
import { MainPageWrapper } from '@/shared/ui/MainPageWrapper/MainPageWrapper';

import type { Message } from '../events';
import type { User as UserModel } from '@/entities/user';

type Player = UserModel & {
  isDead: boolean;
  role: any;
};

type PlayerNodeProps = {
  player: Player;
  isSelected: boolean;
  positionStyle: React.CSSProperties;
};

function PlayerNode({ player, isSelected, positionStyle }: PlayerNodeProps) {
  const hasVotes = isSelected && !player.isDead;

  return (
    <div className={styles.PlayerNode} style={positionStyle}>
      <button
        type="button"
        disabled={player.isDead}
        className={`${styles.PlayerButton} ${isSelected ? styles.PlayerButtonSelected : ''}`}
      >
        <div
          className={cn(
            styles.PlayerCard,
            player.isDead
              ? styles.PlayerCardDead
              : isSelected
                ? styles.PlayerCardSelected
                : styles.PlayerCardAlive,
          )}
        >
          <span className={styles.PlayerIcon}>
            <HatGlasses />
          </span>
          <span
            className={`${styles.PlayerName} ${isSelected ? styles.PlayerNameSelected : ''}`}
          >
            {player.name}
          </span>
        </div>

        {hasVotes && (
          <div className={styles.VoteBadge}>
            <span className={styles.VoteCount}>1</span>
          </div>
        )}
      </button>

      {player.isDead && (
        <div className={styles.DeadOverlay}>
          <Skull className={styles.DeadIcon} />
        </div>
      )}
    </div>
  );
}

export function GamePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const gameId = useGameIdStore(store => store.gameId);
  const removeGameId = useGameIdStore(store => store.remove);

  const { lastJsonMessage } = useWebSocket(`ws://${BASE_URL}/rooms/${id}`, {
    queryParams: {
      authorization: `Bearer ${tokenService.getAccessToken()}`,
    },
    onClose(event) {
      if (event.code === 401) {
        void tokenService.refreshTokens();
      }
    },
    share: true,
  });

  useEffect(() => {
    if (lastJsonMessage !== null) {
      console.log(lastJsonMessage, typeof lastJsonMessage);
    }
  }, [lastJsonMessage]);

  const { data, isPending, isError, error } = useQuery({
    ...getLobbyOptions(id),
    retry: (failureCount, err) => {
      if (err instanceof HttpError && err.status === 404) {
        return false;
      }

      return failureCount < 2;
    },
  });

  useEffect(() => {
    if (lastJsonMessage !== null) {
      // oxlint-disable-next-line react/immutability
      setChatMessages(messages => [...messages, lastJsonMessage as Message]);
    }
  }, [lastJsonMessage]);

  const [selectedPlayer, _setSelectedPlayer] = useState<number | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const players = useMemo(() => data?.participants ?? [], [data]);

  const [events, setChatMessages] = useState<Message[]>([]);

  const playerPositions = useMemo(
    () =>
      players.map((_, i) => {
        const angle = (i / players.length) * 2 * Math.PI - Math.PI / 2;

        return {
          left: `${50 + 38 * Math.cos(angle)}%`,
          top: `${50 + 38 * Math.sin(angle)}%`,
        };
      }),
    [players],
  );

  useEffect(() => {
    chatEndRef.current?.scrollTo(0, chatEndRef.current.scrollHeight);
  }, [events]);

  if (isPending) {
    return (
      <CenterBox>
        <Spinner />
      </CenterBox>
    );
  }

  if (isError) {
    if (error instanceof HttpError && error.status === 404) {
      if (id === gameId) {
        setTimeout(removeGameId, 0);
      }

      setTimeout(() => router.replace('/profile'), 0);

      return (
        <CenterBox>
          <Spinner />
        </CenterBox>
      );
    }

    throw error;
  }

  return (
    <MainPageWrapper className={styles.Wrapper}>
      <div className={styles.Grid}>
        <div className={styles.MainArea}>
          {/* Players circle */}
          <div className={styles.PlayersPanel}>
            <h2 className={styles.SectionTitle}>ПОДОЗРЕВАЕМЫЕ</h2>

            <div className={styles.CircleContainer}>
              <div className={styles.CircleCenter}>
                <div className={styles.CenterDiamond} />
                <div className={styles.CenterGlow} />
              </div>

              {players.map((player, i) => {
                const pos = playerPositions[i];
                const isSelected = selectedPlayer === i;

                return (
                  <PlayerNode
                    key={player.id}
                    player={player as any}
                    isSelected={isSelected}
                    positionStyle={pos}
                  />
                );
              })}
            </div>
          </div>

          <div className={styles.ChatPanel}>
            <div className={styles.ChatHeader}>
              <h2 className={styles.SectionTitle}>События</h2>
            </div>

            <div className={styles.ChatMessages} ref={chatEndRef}>
              {events
                .filter(message => message.topic === 'System')
                .map(message => (
                  <div key={message.timestamp} className={styles.SystemMessage}>
                    {message.payload.text}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </MainPageWrapper>
  );
}
