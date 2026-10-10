import styles from './layout.module.css';
import { QueryClientProvider } from '@/setup/providers/QueryClientProvider';
import { Navbar } from '@/widgets/Navbar/Navbar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.Layout}>
      <Navbar />
      <main className={styles.Main}>
        <QueryClientProvider>{children}</QueryClientProvider>
      </main>
    </div>
  );
}
