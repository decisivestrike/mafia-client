import { queryOptions } from '@tanstack/react-query';
import { fetchAuthorized } from '@/shared/api';
import { createQuery } from '@/shared/api/query';

import type { Lobby } from '../model/lobby';

export const getLobbies = createQuery<Lobby[]>()(() => fetchAuthorized('/lobbies'));

export const getLobbiesOptions = queryOptions({
  queryKey: ['lobbies'],
  queryFn: getLobbies,
});
