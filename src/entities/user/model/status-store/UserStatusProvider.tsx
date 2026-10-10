'use client';

import { type ReactNode, useState } from 'react';
import { UserStatusStoreContext } from './user-status-context';
import { createUserStatusStore } from './user-status-store';

export interface UserStatusStoreProviderProps {
  children: ReactNode;
}

export function UserStatusStoreProvider({ children }: UserStatusStoreProviderProps) {
  const [store] = useState(() => createUserStatusStore());

  return <UserStatusStoreContext value={store}>{children}</UserStatusStoreContext>;
}
