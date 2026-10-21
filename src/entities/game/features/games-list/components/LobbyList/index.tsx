'use client';

import { useQuery } from '@tanstack/react-query';
import { LobbyCard } from '../LobbyCard';
import styles from './lobby-list.module.css';
import { getLobbiesOptions as getGamesOptions } from '@/entities/game/api/get-all';
import { Spinner } from '@/shared/ui';
import { Center } from '@/shared/ui/Center';

export function LobbyList() {
  const { data, error, isPending, isError } = useQuery(getGamesOptions);

  if (isPending) {
    return (
      <Center className={`${styles.Empty} ${styles.Hstretch}`}>
        <Spinner />
      </Center>
    );
  }

  if (isError) {
    return (
      <Center className={`${styles.Empty} ${styles.Hstretch}`}>
        {error.message}
      </Center>
    );
  }

  if (data.length === 0) {
    return (
      <Center className={`${styles.Empty} ${styles.Hstretch}`}>
        Нет доступных лобби
      </Center>
    );
  }

  return (
    <div className={`${styles.Grid} ${styles.Hstretch}`}>
      {data.map(lobby => (
        <LobbyCard key={lobby.id} lobby={lobby} />
      ))}
    </div>
  );
}
