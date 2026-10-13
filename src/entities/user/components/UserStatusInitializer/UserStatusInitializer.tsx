'use client';

import { useQuery } from '@tanstack/react-query';
import { userRoomOptions } from '@/entities/user/api/get-user-room';
import { useUserStatusStore } from '@/entities/user/model/status-store/useUserStatusStore';

export function UserStatusInitializer() {
  const { data, isPending, isError } = useQuery(userRoomOptions);
  const setGameId = useUserStatusStore(store => store.set);

  if (isPending || isError) {
    return null;
  }

  if (data !== null) {
    setGameId(data?.roomId);
  }

  return null;
}
