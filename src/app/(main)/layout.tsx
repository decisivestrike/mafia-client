import styles from './layout.module.css';
import { Navbar } from '@/widgets/Navbar/Navbar';

import type { ReactNode } from 'react';

/** Просто добавляет Navbar */
export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className={styles.Main}>{children}</main>
    </>
  );
}
