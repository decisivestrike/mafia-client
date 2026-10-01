'use client';

import {
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider,
  type QueryClientConfig,
} from '@tanstack/react-query';

import type { ReactNode } from 'react';

let browserQueryClient: QueryClient | undefined;

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
};

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
