'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { getLobbyOptions } from '../api/get-by-id';
import styles from './game-page.module.css';
import { useGameIdStore } from '@/entities/user/model/status-store/useUserStatusStore';
import { tokenService } from '@/shared/api';
import { HttpError } from '@/shared/api/query';
import { BASE_URL } from '@/shared/env';
import { Spinner } from '@/shared/ui';
import { MainPageWrapper } from '@/shared/ui/MainPageWrapper/MainPageWrapper';

export function GamePage() {
  const { id } = useParams<{ id: string }>();
  const { lastMessage, readyState } = useWebSocket(`ws://${BASE_URL}/rooms/${id}`, {
    queryParams: {
      authorization: `Bearer ${tokenService.getAccessToken()}`,
    },
  });

  const { data, isPending, isError, error } = useQuery({
    ...getLobbyOptions(id),
    retry: (failureCount, error) => {
      if (error instanceof HttpError && error.status === 404) {
        return false;
      }

      return failureCount < 2;
    },
  });

  const [messageHistory, setMessageHistory] = useState<string[]>([]);
  const gameId = useGameIdStore(store => store.gameId);
  const removeGameId = useGameIdStore(store => store.remove);
  const router = useRouter();

  useEffect(() => {
    if (lastMessage !== null) {
      // oxlint-disable-next-line react/set-state-in-effect
      setMessageHistory(prev => prev.concat(JSON.stringify(lastMessage.data)));
    }
  }, [lastMessage]);

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    if (error instanceof HttpError && error.status === 404) {
      if (id === gameId) {
        removeGameId();
      }

      setTimeout(() => router.replace('/profile'), 0);
      return <Spinner />;
    } else {
      throw error;
    }
  }

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <MainPageWrapper className={styles.Wrapper}>
      <div>Лобби</div>
      <p>{JSON.stringify(data)}</p>
      <p>{connectionStatus}</p>
      <ul>
        {messageHistory.map((message, index) => (
          // oxlint-disable-next-line react/no-array-index-key
          <li key={index}>{message}</li>
        ))}
      </ul>
    </MainPageWrapper>
  );
}
