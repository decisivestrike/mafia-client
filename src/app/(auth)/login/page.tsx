import Link from 'next/link';
import styles from './page.module.css';
import { LoginForm } from '@/features/auth';

export default function LoginPage() {
  return (
    <main className={styles.Main}>
      <h1 className={styles.Title}>Вход</h1>
      <div className={styles.Container}>
        <LoginForm />
        <div className={styles.Hint}>
          Нет аккаунта?{' '}
          <Link href="/register" className={styles.Link}>
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </main>
  );
}
