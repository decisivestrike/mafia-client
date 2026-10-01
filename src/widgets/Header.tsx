import { cn } from 'cn';
import Link from 'next/link';
// import { ThemeToggle } from '@/features/theme/components/ThemeToggle';
import { Button } from '@/shared/components';

const linkToProfile = <Link href="/profile" />;
const linkToSettings = <Link href="/settings" />;

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header className={cn('flex items-center justify-between px-3 py-2', className)}>
      <div className="hidden font-heading text-3xl font-medium sm:block">Мафия</div>
      <nav aria-label="Основная навигация" className="block w-full max-w-160">
        <ul className="flex w-full justify-evenly gap-4">
          <li>
            <Button render={linkToProfile} nativeButton={false}>
              Профиль
            </Button>
          </li>
          <li>
            <Button render={linkToSettings} nativeButton={false}>
              Настройки
            </Button>
          </li>
        </ul>
      </nav>
      {/* <ThemeToggle /> */}
    </header>
  );
}
