import { LoginForm } from '@features/auth';
import Link from 'next/link';
import styles from './page.module.css';

export default function LoginPage() {
  return (
    <main className={styles.Main}>
      <h1 className={styles.Title}>Вход</h1>
      <LoginForm />
      <div className={styles.Hint}>
        Нет аккаунта?{' '}
        <Link href="/register" className={styles.Link}>
          Зарегистрироваться
        </Link>
      </div>
    </main>
  );
}
