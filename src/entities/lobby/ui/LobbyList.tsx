'use client';

import { useQuery } from '@tanstack/react-query';
import { getLobbiesOptions } from '../api/get-lobbies';
import { LobbyCard } from './LobbyCard';
import { Spinner } from '@/shared/components';

export function LobbyList() {
  const { data, error, isPending, isError } = useQuery(getLobbiesOptions);

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  if (data.length === 0) {
    return <div className="font-body font-medium">Нет доступных лобби</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.map(lobby => (
        <LobbyCard key={lobby.id} lobby={lobby} />
      ))}
    </div>
  );
}
