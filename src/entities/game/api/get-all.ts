import { queryOptions } from '@tanstack/react-query';
import { fetchAuthorized } from '@/shared/api';
import { createRequest } from '@/shared/api';

import type { Game } from '../model/game';

export const getLobbies = createRequest<Game[]>()(() => fetchAuthorized('/lobbies'));

export const getLobbiesOptions = queryOptions({
  queryKey: ['lobbies'],
  queryFn: getLobbies,
});
