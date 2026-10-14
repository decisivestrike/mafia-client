import { queryOptions } from '@tanstack/react-query';
import { fetchAuthorized } from '@/shared/api';
import { createRequest } from '@/shared/api/query';

import type { Game } from '../model/game';

const getLobby = createRequest<Game>()((id: string) =>
  fetchAuthorized(`/lobbies/${id}`),
);

export const getLobbyOptions = (id: string) =>
  queryOptions({
    queryKey: ['lobbies', id],
    queryFn: () => getLobby(id),
  });
