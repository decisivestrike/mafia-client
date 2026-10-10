import Link from 'next/link';
import styles from './page.module.css';
import { RegisterForm } from '@/features/auth';

export default function RegisterPage() {
  return (
    <main className={styles.Main}>
      <h1 className={styles.Title}>Регистрация</h1>
      <RegisterForm />
      <div className={styles.Hint}>
        Уже есть аккаунт?{' '}
        <Link href="/login" className={styles.Link}>
          Войти
        </Link>
      </div>
    </main>
  );
}
