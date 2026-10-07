'use client';

import {
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider,
} from '@tanstack/react-query';
import { queryClientConfig } from '../config/query-client-config';

import type { ReactNode } from 'react';

let browserQueryClient: QueryClient | undefined;

function createQueryClient() {
  return new QueryClient(queryClientConfig);
}

function getQueryClient() {
  if (typeof window === 'undefined') return createQueryClient();
  browserQueryClient ??= createQueryClient();
  return browserQueryClient;
}

export function QueryClientProvider({ children }: { children: ReactNode }) {
  return (
    <TanstackQueryClientProvider client={getQueryClient()}>
      {children}
    </TanstackQueryClientProvider>
  );
}
