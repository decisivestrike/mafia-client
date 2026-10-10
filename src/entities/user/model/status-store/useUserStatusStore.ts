import { useContext } from 'react';
import { useStore } from 'zustand';
import { UserStatusStoreContext } from './user-status-context';

import type { UserStatusStore } from './user-status-store';

export function useUserStatusStore<T>(selector: (store: UserStatusStore) => T): T {
  const userStatusStoreContext = useContext(UserStatusStoreContext);

  if (!userStatusStoreContext) {
    throw new Error(
      'useUserStatusStore must be used within userStatusStoreProvider',
    );
  }

  return useStore(userStatusStoreContext, selector);
}
