'use client';

import { useQuery } from '@tanstack/react-query';
import { Skull, HatGlasses } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { use, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import styles from './game-page.module.css';
import { getLobbyOptions } from '@/entities/game/api/get-by-id';
import { useGameId, useGameIdActions } from '@/entities/game/stores/game-id-store';
import { tokenService } from '@/shared/api';
import { HttpError } from '@/shared/api/query';
import { BASE_URL } from '@/shared/env';
import { cn } from '@/shared/lib/utils';
import { Button, Spinner } from '@/shared/ui';
import { BoundedPage } from '@/shared/ui/BoundedPage/BoundedPage';
import { Center } from '@/shared/ui/Center/Center';

import type { Message } from '../events';
import type { LobbyCommandPayload } from '../events/payloads';
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

const loadTokensPromise = tokenService.loadTokens();

export function GamePage() {
  use(loadTokensPromise);

  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const gameId = useGameId();
  const { removeGameId } = useGameIdActions();

  const [events, setEvents] = useState<Message[]>([]);

  const { sendMessage } = useWebSocket(`ws://${BASE_URL}/rooms/${id}`, {
    queryParams: {
      authorization: `Bearer ${tokenService.getAccessToken()}`,
    },
    onMessage(message) {
      const event = JSON.parse(message.data) as Message;
      setEvents(events => [...events, event]);
    },
    onClose(event) {
      if (event.code === 401) {
        void tokenService.refreshTokens();
      }
    },
    share: true,
  });

  const { data, isPending, isError, error } = useQuery({
    ...getLobbyOptions(id),
    retry: (failureCount, err) => {
      if (err instanceof HttpError && err.status === 404) {
        return false;
      }

      return failureCount < 2;
    },
  });

  const [selectedPlayer, _setSelectedPlayer] = useState<number | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const players = useMemo(() => data?.participants ?? [], [data]);

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

  const onLeaveButtonClick = useCallback(() => {
    const payload: LobbyCommandPayload = {
      actionType: 'Leave',
      roomId: id,
      targetId: null,
      roleSet: null,
    };

    const message: Message = {
      topic: 'Lobby',
      messageType: 'Command',
      timestamp: new Date().toISOString(),
      payload,
    };

    sendMessage(JSON.stringify(message));

    removeGameId();

    router.replace('/profile');
  }, [router, sendMessage, id, removeGameId]);

  if (isPending) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (isError) {
    if (error instanceof HttpError && error.status === 404) {
      if (id === gameId) {
        setTimeout(removeGameId, 0);
      }

      setTimeout(() => router.replace('/profile'), 0);

      return (
        <Center>
          <Spinner />
        </Center>
      );
    }

    throw error;
  }

  return (
    <BoundedPage maxWidth="80rem">
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
              {events.map(message => (
                <div key={message.timestamp} className={styles.SystemMessage}>
                  {messageToText(message)}
                </div>
              ))}
            </div>
          </div>

          <Button onClick={onLeaveButtonClick}>Выйти</Button>
        </div>
      </div>
    </BoundedPage>
  );
}

function messageToText(message: Message): string | null {
  const payload = message.payload;

  if (payload && 'text' in payload) {
    return payload.text;
  }

  if (message.messageType === 'GameStart') {
    return 'Игра началась';
  }

  if (message.messageType === 'GameFinish') {
    return 'Игра окончена';
  }

  return null;
}
