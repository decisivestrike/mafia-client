import { createContext } from 'react';

import type { createUserStatusStore } from './user-status-store';

export type UserStatusStore = ReturnType<typeof createUserStatusStore>;

export const UserStatusStoreContext = createContext<UserStatusStore | undefined>(
  undefined,
);
