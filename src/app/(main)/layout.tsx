import { type ReactNode } from 'react';
import styles from './layout.module.css';
import { Navbar } from '@/widgets/Navbar/Navbar';

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main className={styles.Main}>{children}</main>
    </>
  );
}
