import Link from 'next/link';
import styles from './hint.module.css';

export const loginHint = (
  <>
    Нет аккаунта?{' '}
    <Link href="/register" className={styles.Link}>
      Зарегистрироваться
    </Link>
  </>
);
