import { ToastProvider } from '@/features/toast';
import { Center } from '@/shared/ui/Center/Center';

import type { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Center>
      <ToastProvider>{children}</ToastProvider>
    </Center>
  );
}
