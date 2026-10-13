import { useContext } from 'react';
import { useStore } from 'zustand';
import { GameIdStoreContext } from './user-status-context';

import type { GameIdStore } from './user-status-store';

export function useGameIdStore<T>(selector: (store: GameIdStore) => T): T {
  const userStatusStoreContext = useContext(GameIdStoreContext);

  if (!userStatusStoreContext) {
    throw new Error(
      'useUserStatusStore must be used within userStatusStoreProvider',
    );
  }

  return useStore(userStatusStoreContext, selector);
}
