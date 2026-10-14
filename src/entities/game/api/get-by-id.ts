import { queryOptions } from '@tanstack/react-query';
import { fetchAuthorized } from '@/shared/api';
import { createRequest } from '@/shared/api/query';

import type { Lobby } from '../model/lobby';

const getLobby = createRequest<Lobby>()((id: string) =>
  fetchAuthorized(`/lobbies/${id}`),
);

export const getLobbyOptions = (id: string) =>
  queryOptions({
    queryKey: ['lobbies', id],
    queryFn: () => getLobby(id),
  });
