'use client';

import { useQuery } from '@tanstack/react-query';
import { cn } from 'cn';
import { getLobbiesOptions } from '../api/get-lobbies';
import styles from './lobby-list.module.css';
import { LobbyCard } from './LobbyCard';
import { font } from '@/shared/config/fonts';
import { Spinner } from '@/shared/ui';

export function LobbyList() {
  const { data, error, isPending, isError } = useQuery(getLobbiesOptions);

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  if (data.length === 0) {
    return <div className={cn(styles.Empty, font.body)}>Нет доступных лобби</div>;
  }

  return (
    <div className={styles.Grid}>
      {data.map(lobby => (
        <LobbyCard key={lobby.id} lobby={lobby} />
      ))}
    </div>
  );
}
