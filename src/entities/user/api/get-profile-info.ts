import { type User } from '@/entities/user';
import { fetchAuthorized } from '@/shared/api';
import { createQuery } from '@/shared/api/query';

export const getProfileInfo = createQuery<User>()(() => fetchAuthorized('/user/me'));
