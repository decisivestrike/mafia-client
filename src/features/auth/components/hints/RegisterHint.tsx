import Link from 'next/link';
import styles from './hint.module.css';

export const registerHint = (
  <>
    Уже есть аккаунт?{' '}
    <Link href="/login" className={styles.Link}>
      Войти
    </Link>
  </>
);
