import { fetchAuthorized } from '@/shared/api';

import type User from '../models/user';

export async function getProfileInfo() {
  const response = await fetchAuthorized('/user/me');

  if (!response.ok) {
    throw new Error('Не могу получить данные профиля');
  }

  return (await response.json()) as User;
}
