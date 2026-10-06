import { fetchAuthorized } from '@/shared/api';
import { createQuery } from '@/shared/api/query';

import type { Lobby } from '../models/lobby';

export const getLobbies = createQuery<Lobby[]>()(() => fetchAuthorized('/lobbies'));
