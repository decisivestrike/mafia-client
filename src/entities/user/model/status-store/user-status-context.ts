'use client';

import { createContext } from 'react';

import type { createGameIdStore } from './user-status-store';

export type GameIdStoreApi = ReturnType<typeof createGameIdStore>;

export const GameIdStoreContext = createContext<GameIdStoreApi | undefined>(
  undefined,
);
