import { type ReactNode } from 'react';
import styles from './layout.module.css';
import { Navbar } from '@/features/navbar';
import { ToastProvider } from '@/features/toast';

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main className={styles.Main}>
        <ToastProvider additionalBottom="4rem">{children}</ToastProvider>
      </main>
    </>
  );
}
