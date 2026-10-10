import styles from './layout.module.css';
import { QueryClientProvider } from '@/setup/providers/QueryClientProvider';
import Header from '@/widgets/Header';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.Layout}>
      <Header className={styles.Header} />
      <main className={styles.Main}>
        <QueryClientProvider>{children}</QueryClientProvider>
      </main>
    </div>
  );
}
