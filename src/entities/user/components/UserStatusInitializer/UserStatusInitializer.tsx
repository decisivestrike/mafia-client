'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { userRoomOptions } from '@/entities/user/api/get-user-room';
import { useGameIdStore } from '@/entities/user/model/status-store/useUserStatusStore';

export function UserStatusInitializer() {
  const { data, isPending, isError } = useQuery(userRoomOptions);
  const setGameId = useGameIdStore(store => store.set);
  const removeGameId = useGameIdStore(store => store.remove);

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
