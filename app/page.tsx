import { Button } from '@shared/ui';
import Link from 'next/link';
import styles from './page.module.css';

const linkToLogin = <Link href="/login" />;
const linkToRegister = <Link href="/register" />;

export default function Home() {
  return (
    <div className={styles.Page}>
      <main className={styles.Main}>
        <h1 className={styles.Title}>Мафия</h1>
        <div className={styles.Actions}>
          <Button render={linkToLogin} nativeButton={false}>
            Вход
          </Button>
          <Button render={linkToRegister} nativeButton={false}>
            Регистрация
          </Button>
        </div>
      </main>
    </div>
  );
}
