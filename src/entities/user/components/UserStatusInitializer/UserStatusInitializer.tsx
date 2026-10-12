'use client';

import { useQuery } from '@tanstack/react-query';
import { userRoomOptions } from '@/entities/user/api/get-user-room';
import { useUserStatusStore } from '@/entities/user/model/status-store/useUserStatusStore';

export function UserStatusInitializer() {
  const { data, isPending } = useQuery(userRoomOptions);
  const dispatch = useUserStatusStore(store => store.dispatch);

  if (!isPending && data) {
    dispatch({ type: 'init', roomId: data.roomId, isLobby: data.isLobby });
  }

  return null;
}
