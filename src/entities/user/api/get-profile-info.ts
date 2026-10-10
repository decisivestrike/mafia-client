import { queryOptions } from '@tanstack/react-query';
import { type User } from '@/entities/user';
import { fetchAuthorized } from '@/shared/api';
import { createRequest } from '@/shared/api/query';

export const getProfileInfo = createRequest<User>()(() =>
  fetchAuthorized('/user/me'),
);

export const profileInfoOptions = queryOptions({
  queryKey: ['profile'],
  queryFn: getProfileInfo,
});
