'use client';

import { useQuery } from '@tanstack/react-query';
import { Send, Skull, HatGlasses } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { getLobbyOptions } from '../api/get-by-id';
import styles from './game-page.module.css';
import { useGameIdStore } from '@/entities/user/model/status-store/useUserStatusStore';
import { tokenService } from '@/shared/api';
import { HttpError } from '@/shared/api/query';
import { BASE_URL } from '@/shared/env';
import { Spinner } from '@/shared/ui';
import { MainPageWrapper } from '@/shared/ui/MainPageWrapper/MainPageWrapper';

import type { Lobby } from '../model/lobby';
import type { User as UserModel } from '@/entities/user';

type ChatMessage = {
  id: number;
  player: string;
  message: string;
  timestamp: string;
  isSystem?: boolean;
};

const ROLES = ['sheriff', 'mafia', 'doctor', 'citizen'] as const;
type GameRole = (typeof ROLES)[number];

type Player = UserModel & {
  isDead: boolean;
  role: GameRole;
};

type PlayerNodeProps = {
  player: Player;
  isSelected: boolean;
  positionStyle: React.CSSProperties;
  onSelect: () => void;
};

function PlayerNode({
  player,
  isSelected,
  positionStyle,
  onSelect,
}: PlayerNodeProps) {
  const hasVotes = isSelected && !player.isDead;

  return (
    <div className={styles.PlayerNode} style={positionStyle}>
      <button
        type="button"
        onClick={onSelect}
        disabled={player.isDead}
        className={`${styles.PlayerButton} ${isSelected ? styles.PlayerButtonSelected : ''}`}
      >
        <div
          className={`${styles.PlayerCard} ${player.isDead ? styles.PlayerCardDead : isSelected ? styles.PlayerCardSelected : styles.PlayerCardAlive}`}
        >
          <span className={styles.PlayerIcon}>
            <HatGlasses />
          </span>
          <span
            className={`${styles.PlayerName} ${isSelected ? styles.PlayerNameSelected : ''}`}
          >
            {player.name.slice(0, 8)}
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

type PlayerWrapperProps = {
  player: Player;
  index: number;
  positionStyle: React.CSSProperties;
  isSelected: boolean;
  onPlayerClick: (index: number) => void;
};

function PlayerWrapper({
  player,
  index,
  positionStyle,
  isSelected,
  onPlayerClick,
}: PlayerWrapperProps) {
  const handleClick = useCallback(() => {
    onPlayerClick(index);
  }, [onPlayerClick, index]);

  return (
    <PlayerNode
      player={player}
      isSelected={isSelected}
      positionStyle={positionStyle}
      onSelect={handleClick}
    />
  );
}

export function GamePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const gameId = useGameIdStore(store => store.gameId);
  const removeGameId = useGameIdStore(store => store.remove);

  const { data, isPending, isError, error } = useQuery({
    ...getLobbyOptions(id),
    retry: (failureCount, err) => {
      if (err instanceof HttpError && err.status === 404) {
        return false;
      }

      return failureCount < 2;
    },
  });

  const { lastMessage } = useWebSocket(`ws://${BASE_URL}/rooms/${id}`, {
    queryParams: {
      authorization: `Bearer ${tokenService.getAccessToken()}`,
    },
  });

  useEffect(() => {
    if (lastMessage !== null) {
      // oxlint-disable-next-line react/immutability
      setChatMessages(prev => prev.concat(JSON.stringify(lastMessage.data) as any));
    }
  }, [lastMessage]);

  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const participants = useMemo(
    () => (data as Lobby | undefined)?.participants ?? [],
    [data],
  );

  const players = participants;

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

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
  }, [chatMessages]);

  const handlePlayerClick = useCallback((index: number) => {
    setSelectedPlayer(prev => (prev === index ? null : index));
  }, []);

  const handleSend = useCallback(() => {
    if (message.trim()) {
      setMessage('');
    }
  }, [message]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSend();
      }
    },
    [handleSend],
  );

  const handleMessageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setMessage(e.target.value);
    },
    [],
  );

  const handleVote = useCallback(() => {}, []);

  const handleReset = useCallback(() => {
    setSelectedPlayer(null);
  }, []);

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    if (error instanceof HttpError && error.status === 404) {
      if (id === gameId) {
        setTimeout(removeGameId, 0);
      }

      setTimeout(() => router.replace('/profile'), 0);

      return <Spinner />;
    }

    throw error;
  }

  return (
    <MainPageWrapper className={styles.Wrapper}>
      <div className={styles.Grid}>
        {/* ---- Main area ---- */}
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
                  <PlayerWrapper
                    key={player.id}
                    player={player as any}
                    index={i}
                    isSelected={isSelected}
                    positionStyle={pos}
                    onPlayerClick={handlePlayerClick}
                  />
                );
              })}
            </div>

            <div className={styles.Actions}>
              <button
                type="button"
                disabled={selectedPlayer === null}
                className={styles.VoteButton}
                onClick={handleVote}
              >
                ГОЛОСОВАТЬ
              </button>
              <button
                type="button"
                onClick={handleReset}
                className={styles.ResetButton}
              >
                СБРОСИТЬ
              </button>
            </div>
          </div>

          {/* Chat */}
          <div className={styles.ChatPanel}>
            <div className={styles.ChatHeader}>
              <h2 className={styles.SectionTitle}>ЧАТ</h2>
            </div>

            <div className={styles.ChatMessages} ref={chatEndRef}>
              {chatMessages.map((msg, id) => (
                // oxlint-disable-next-line react/no-array-index-key
                <div key={id} className={msg.isSystem ? styles.SystemMessage : ''}>
                  <div className={styles.MessageHeader}>
                    <span
                      className={`${styles.MessageTime} ${msg.isSystem ? styles.MessageTimeSystem : ''}`}
                    >
                      {msg.timestamp}
                    </span>
                    <span
                      className={`${styles.MessageAuthor} ${msg.isSystem ? styles.MessageAuthorSystem : ''}`}
                    >
                      {msg.player}
                    </span>
                  </div>
                  <p
                    className={`${styles.MessageText} ${msg.isSystem ? styles.MessageTextSystem : ''}`}
                  >
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>

            <div className={styles.ChatInputArea}>
              <div className={styles.ChatForm}>
                <input
                  type="text"
                  placeholder="Сообщение..."
                  value={message}
                  onChange={handleMessageChange}
                  onKeyDown={handleKeyDown}
                  className={styles.ChatInput}
                />
                <button
                  type="button"
                  onClick={handleSend}
                  className={styles.SendButton}
                >
                  <Send className={styles.SendIcon} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainPageWrapper>
  );
}
