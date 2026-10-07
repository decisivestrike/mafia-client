import { ThemeProvider } from '@/features/theme';
import { ToastProvider } from '@/features/toast';

import type { ReactNode } from 'react';

/** Все провайдеры в одном месте */
export function RootProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  );
}
