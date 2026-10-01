'use client';

import { Provider } from 'jotai';
import { store } from '@/_app/store';

import type { ReactNode } from 'react';

export function JotaiProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
