import { type User } from '@entities/user';
import { fetchAuthorized } from '@shared/api';
import { createQuery } from '@shared/api/query';
import { queryOptions } from '@tanstack/react-query';

export const getProfileInfo = createQuery<User>()(() => fetchAuthorized('/user/me'));

export const profileInfoOptions = queryOptions({
  queryKey: ['profile'],
  queryFn: getProfileInfo,
});
