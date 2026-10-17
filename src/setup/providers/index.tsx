import { Provider as JotaiProvider } from 'jotai';
import { QueryClientProvider } from './QueryClientProvider';
import { ThemeProvider } from '@/features/theme';

import type { ReactNode } from 'react';

/** Все провайдеры в одном месте */
export function RootProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <JotaiProvider>
        <QueryClientProvider>{children}</QueryClientProvider>
      </JotaiProvider>
    </ThemeProvider>
  );
}
