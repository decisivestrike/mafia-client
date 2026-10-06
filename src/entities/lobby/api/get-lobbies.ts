import { fetchAuthorized } from '@/shared/api';

import type { Lobby } from '../models/lobby';

export async function getLobbies(): Promise<Lobby[]> {
  const response = await fetchAuthorized('/lobbies');

  if (!response.ok) {
    throw new Error('Не могу получить данные лобби');
  }

  return (await response.json()) as Lobby[];
}
