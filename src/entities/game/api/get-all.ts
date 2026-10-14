import { queryOptions } from '@tanstack/react-query';
import { fetchAuthorized } from '@/shared/api';
import { createRequest } from '@/shared/api/query';

import type { Lobby } from '../model/lobby';

export const getLobbies = createRequest<Lobby[]>()(() =>
  fetchAuthorized('/lobbies'),
);

export const getLobbiesOptions = queryOptions({
  queryKey: ['lobbies'],
  queryFn: getLobbies,
});
