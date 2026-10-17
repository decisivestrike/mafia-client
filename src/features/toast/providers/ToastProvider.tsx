'use client';

import { Toast } from '@base-ui/react';
import { useEffect, type ReactNode } from 'react';
import { ToastList } from '../components/ToastList';
import styles from './toast-provider.module.css';

export function ToastPortal() {
  return (
    <Toast.Portal>
      <Toast.Viewport className={styles.Viewport}>
        <ToastList />
      </Toast.Viewport>
    </Toast.Portal>
  );
}

type ToastProviderProps = {
  children: ReactNode;
  additionalBottom?: string;
};

const toastBottomVar = '--toast-additional-bottom';

export function ToastProvider({ children, additionalBottom }: ToastProviderProps) {
  useEffect(() => {
    if (additionalBottom === undefined) return;

    document.body.style.setProperty(toastBottomVar, additionalBottom);

    return () => {
      document.body.style.removeProperty(toastBottomVar);
    };
  }, [additionalBottom]);

  return (
    <Toast.Provider>
      {children}
      <ToastPortal />
    </Toast.Provider>
  );
}
