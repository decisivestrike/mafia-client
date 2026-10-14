import { mutationOptions } from '@tanstack/react-query';
import { fetchAuthorized } from '@/shared/api';
import { createRequest } from '@/shared/api/query';

import type { Lobby } from '../model/lobby';

const createGame = createRequest<Lobby>()((maxPlayers: number) =>
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
