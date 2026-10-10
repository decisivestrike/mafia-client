'use client';

import { cn } from 'cn';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './header.module.css';
import { logout } from '@/features/auth';
import { font } from '@/shared/config/fonts';
import { Button } from '@/shared/ui';

const linkToProfile = <Link href="/profile" />;
const linkToGames = <Link href="/games" />;
const linkToSettings = <Link href="/settings" />;

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  const router = useRouter();

  return (
    <header className={cn(styles.Header, className)}>
      <div className={cn(styles.Logo, font.heading)} aria-label="logo">
        Мафия
      </div>
      <nav aria-label="Основная навигация" className={styles.Nav}>
        <ul className={styles.List}>
          <li>
            <Button render={linkToProfile} nativeButton={false}>
              Профиль
            </Button>
          </li>
          <li>
            <Button render={linkToGames} nativeButton={false}>
              Игры
            </Button>
          </li>
          <li>
            <Button render={linkToSettings} nativeButton={false}>
              Настройки
            </Button>
          </li>
          <li>
            <Button
              // oxlint-disable-next-line react-perf/jsx-no-new-function-as-prop
              onClick={() => logout().then(ok => ok && router.replace('/login'))}
            >
              Выйти
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
