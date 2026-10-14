'use client';

import { useQuery } from '@tanstack/react-query';
import { getLobbiesOptions as getGamesOptions } from '../api/get-all';
import styles from './lobby-list.module.css';
import { LobbyCard } from './LobbyCard';
import { Spinner } from '@/shared/ui';

export function LobbyList() {
  const { data, error, isPending, isError } = useQuery(getGamesOptions);

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  if (data.length === 0) {
    return <div className={styles.Empty}>Нет доступных лобби</div>;
  }

  return (
    <div className={styles.Grid}>
      {data.map(lobby => (
        <LobbyCard key={lobby.id} lobby={lobby} />
      ))}
    </div>
  );
}
