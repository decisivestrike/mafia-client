import { fetchAuthorized, url } from '@/shared/api';

import type User from '../models/user';

export async function getMe() {
  const response = await fetchAuthorized(url('/user/me'));

  if (!response.ok) {
    throw new Error('Не могу получить данные профиля');
  }

  return (await response.json()) as User;
}
