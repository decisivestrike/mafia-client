'use client';

import { type ReactNode, useState } from 'react';
import { GameIdStoreContext } from './user-status-context';
import { createGameIdStore } from './user-status-store';

export interface GameIdStoreProviderProps {
  children: ReactNode;
}

export function GameIdStoreProvider({ children }: GameIdStoreProviderProps) {
  const [store] = useState(() => createGameIdStore());

  return <GameIdStoreContext value={store}>{children}</GameIdStoreContext>;
}
