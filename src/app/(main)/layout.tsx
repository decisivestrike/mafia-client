import styles from './layout.module.css';
import { UserStatusInitializer, UserStatusStoreProvider } from '@/entities/user';
import { Navbar } from '@/widgets/Navbar/Navbar';

import type { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <UserStatusStoreProvider>
      <UserStatusInitializer />
      <Navbar />
      <main className={styles.Main}>{children}</main>
    </UserStatusStoreProvider>
  );
}
