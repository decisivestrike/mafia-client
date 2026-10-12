import { queryOptions } from '@tanstack/react-query';
import { fetchAuthorized } from '@/shared/api';
import { createRequest } from '@/shared/api/query';

import type { UserRoomInfo } from '../model/user-room-info';

export const getUserRoom = createRequest<UserRoomInfo>()(() =>
  fetchAuthorized('/user/room'),
);

export const userRoomOptions = queryOptions({
  queryKey: ['user-room'],
  queryFn: getUserRoom,
});
