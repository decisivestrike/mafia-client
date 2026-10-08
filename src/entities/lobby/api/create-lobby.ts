import { mutationOptions } from '@tanstack/react-query';
import { fetchAuthorized } from '@/shared/api';
import { createQuery } from '@/shared/api/query';

import type { Lobby } from '../model/lobby';

const createLobby = createQuery<Lobby>()((maxPlayers: number) =>
  fetchAuthorized('/lobbies', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ maxPlayers }),
  }),
);

export const lobbyCreationOptions = mutationOptions({
  mutationKey: ['lobbies'],
  mutationFn: (maxPlayers: number) => createLobby(maxPlayers),
});
