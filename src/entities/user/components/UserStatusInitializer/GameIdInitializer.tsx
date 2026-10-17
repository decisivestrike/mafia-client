'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useGameIdActions } from '../../model/status-store/user-status-store';
import { userRoomOptions } from '@/entities/user/api/get-user-room';

export function GameIdInitializer() {
  const { data, isPending, isError } = useQuery(userRoomOptions);
  const { setGameId, removeGameId } = useGameIdActions();

  useEffect(() => {
    if (isPending || isError) {
      return;
    }

    if (data !== null) {
      setGameId(data.roomId);
    } else {
      removeGameId();
    }
  }, [data, isPending, isError, setGameId, removeGameId]);

  return null;
}
