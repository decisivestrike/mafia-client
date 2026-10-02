import { cn } from 'cn';
import Link from 'next/link';
// import { ThemeToggle } from '@/features/theme/components/ThemeToggle';
import { Button } from '@/shared/components';

const linkToProfile = <Link href="/profile" />;
const linkToLobbies = <Link href="/lobbies" />;
const linkToSettings = <Link href="/settings" />;

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header className={cn('flex items-center justify-between px-3 py-2', className)}>
      <div
        className="hidden font-heading text-3xl font-medium sm:block"
        aria-label="logo"
      >
        Мафия
      </div>
      <nav aria-label="Основная навигация" className="block">
        <ul className="flex gap-4">
          <li>
            <Button render={linkToProfile} nativeButton={false}>
              Профиль
            </Button>
          </li>
          <li>
            <Button render={linkToLobbies} nativeButton={false}>
              Лобби
            </Button>
          </li>
          <li>
            <Button render={linkToSettings} nativeButton={false}>
              Настройки
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
