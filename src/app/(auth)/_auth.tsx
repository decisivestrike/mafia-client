import Link from 'next/link';
import styles from './auth.module.css';
import { LoginForm, RegisterForm } from '@/features/auth';
import { Separator } from '@/shared/ui';

interface Props {
  type: 'login' | 'register';
}

export function AuthPage({ type }: Props) {
  return (
    <main className={styles.Main}>
      <div>
        <h1 className={styles.Title}>Мафия</h1>
        <div className={styles.SubtitleContainer}>
          <div className={styles.Rule} />
          <span className={styles.Subtitle}>
            {type === 'login' ? 'Вход' : 'Регистрация'}
          </span>
          <div className={styles.Rule} />
        </div>
      </div>
      <div className={`${styles.Container} Card`}>
        {type === 'login' ? <LoginForm /> : <RegisterForm />}
        <Separator />
        <div className={styles.Hint}>
          <Hint type={type} />
        </div>
      </div>
    </main>
  );
}

function Hint({ type }: Props) {
  return type === 'login' ? (
    <>
      Нет аккаунта?{' '}
      <Link href="/register" className={styles.Link}>
        Зарегистрироваться
      </Link>
    </>
  ) : (
    <>
      Уже есть аккаунт?{' '}
      <Link href="/login" className={styles.Link}>
        Войти
      </Link>
    </>
  );
}
