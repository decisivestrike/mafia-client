import { Toast } from '@base-ui/react';
import { ToastList } from '../components/ToastList';

import type { ReactNode } from 'react';

export function ToastPortal() {
  return (
    <Toast.Portal>
      <Toast.Viewport className="fixed top-auto right-4 bottom-4 z-1 mx-auto w-[calc(100vw-2rem)] sm:right-8 sm:bottom-8 sm:w-90">
        <ToastList />
      </Toast.Viewport>
    </Toast.Portal>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <Toast.Provider>
      {children}
      <ToastPortal />
    </Toast.Provider>
  );
}
