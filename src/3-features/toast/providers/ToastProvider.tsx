import { Toast } from '@base-ui/react';
import { ToastList } from '../components/ToastList';
import styles from './toast-provider.module.css';

import type { ReactNode } from 'react';

export function ToastPortal() {
  return (
    <Toast.Portal>
      <Toast.Viewport className={styles.Viewport}>
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
