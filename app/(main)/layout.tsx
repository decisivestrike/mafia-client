import Header from '@widgets/Header';
import styles from './layout.module.css';
import { QueryClientProvider } from '@/0-app/providers/QueryClientProvider';

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
