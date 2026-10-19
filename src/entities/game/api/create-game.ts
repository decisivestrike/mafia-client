import { mutationOptions } from '@tanstack/react-query';
import { fetchAuthorized } from '@/shared/api';
import { createRequest } from '@/shared/api';

import type { Game } from '../model/game';

const createGame = createRequest<Game>()((maxPlayers: number) =>
  fetchAuthorized('/lobbies', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ maxPlayers }),
  }),
);

export const gameCreationOptions = mutationOptions({
  mutationKey: ['lobbies'],
  mutationFn: (maxPlayers: number) => createGame(maxPlayers),
});
