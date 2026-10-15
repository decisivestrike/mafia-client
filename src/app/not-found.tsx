import Link from 'next/link';
import styles from './not-found.module.css';
import { Button } from '@/shared/ui';
import { Center } from '@/shared/ui/Center/Center';

const linkToMain = <Link href="/" />;

export default function NotFound() {
  return (
    <Center>
      <main className={styles.Main}>
        <h1 className={styles.Title}>Страница не найдена</h1>
        <p>
          Похоже, вы свернули не на ту улицу. Этой страницы не существует в нашем
          городе — возможно, её <span className={styles.Mono}>убрали</span> прошлой
          ночью, или она никогда не была частью игры.
        </p>
        <p>
          Не стоит кричать и привлекать внимание. Просто вернитесь в центр города,
          пока комиссар не задал лишних вопросов.
        </p>
        <Button render={linkToMain} nativeButton={false} className={styles.Button}>
          Вернуться на главную
        </Button>
      </main>
    </Center>
  );
}
