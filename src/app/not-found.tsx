import { cn } from 'cn';
import Link from 'next/link';
import styles from './not-found.module.css';
import { Button } from '@/shared/ui';

const linkToMain = <Link href="/" />;

export default function NotFound() {
  return (
    <div className={styles.Root}>
      <main className={styles.Main}>
        <h2 className={styles.Title}>404 - Страница не найдена</h2>
        <p>
          Похоже, вы свернули не на ту улицу. Этой страницы не существует в нашем
          городе — возможно, её <span className={cn(styles.Mono)}>убрали</span>{' '}
          прошлой ночью, или она никогда не была частью игры.
        </p>
        <p>
          Не стоит кричать и привлекать внимание. Просто вернитесь в центр города,
          пока комиссар не задал лишних вопросов.
        </p>
        <Button render={linkToMain} nativeButton={false} className={styles.Button}>
          Вернуться на главную
        </Button>
      </main>
    </div>
  );
}
