'use client';

import { User, Gamepad2, Settings, LogOut } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import styles from './navbar.module.css';
import { logout } from '@/features/auth';

const navItems = [
  { icon: User, label: 'Профиль', path: '/profile' as const },
  { icon: Gamepad2, label: 'Игры', path: '/games' as const },
  { icon: Settings, label: 'Настройки', path: '/settings' as const },
] as const;

function isActiveItem(pathname: string, path: string): boolean {
  return pathname === path || (path === '/games' && pathname.startsWith('/game'));
}

export function Navbar() {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  );
}

function DesktopNavbar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = useCallback(() => {
    void logout().then(ok => ok && router.replace('/login'));
  }, [router]);

  const handleDesktopClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = (e.target as HTMLElement).closest('[data-path]');
      if (target instanceof HTMLElement && target.dataset.path) {
        const path = target.dataset.path as
          | '/profile'
          | '/games'
          | '/settings'
          | '/';

        if (path === '/') {
          void logout().then(ok => ok && router.replace('/login'));
        } else {
          router.push(path);
        }
      }
    },
    [router],
  );

  return (
    <header className={styles.Header}>
      <div className={styles.Inner}>
        <div className={styles.LogoText}>Мафия</div>

        {/* Nav links */}
        <nav className={styles.Nav} onClick={handleDesktopClick}>
          {navItems.map(item => {
            const Icon = item.icon;
            const active = isActiveItem(pathname, item.path);

            return (
              <button
                key={item.path}
                data-path={item.path}
                className={`${styles.NavButton} ${active ? styles.NavButtonActive : ''}`}
                type="button"
              >
                <Icon className={styles.NavIcon} strokeWidth={1.5} />
                <span>{item.label}</span>
                {active && <div className={styles.ActiveIndicator} />}
              </button>
            );
          })}
        </nav>

        <button onClick={handleLogout} className={styles.LogoutButton} type="button">
          <LogOut className={styles.LogoutIcon} strokeWidth={1.5} />
          ВЫХОД
        </button>
      </div>
    </header>
  );
}

export function MobileNavbar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleMobileClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const target = (e.target as HTMLElement).closest('[data-path-mobile]');
      if (target instanceof HTMLElement && target.dataset.pathMobile) {
        const path = target.dataset.pathMobile as
          | '/profile'
          | '/games'
          | '/settings'
          | '/';

        if (path === '/') {
          void logout().then(ok => ok && router.replace('/login'));
        } else {
          router.push(path);
        }
      }
    },
    [router],
  );

  return (
    <nav className={styles.MobileNav} onClick={handleMobileClick}>
      {navItems.map(item => {
        const Icon = item.icon;
        const active = isActiveItem(pathname, item.path);

        return (
          <button
            key={item.path}
            data-path-mobile={item.path}
            className={`${styles.MobileItem} ${active ? styles.MobileItemActive : ''}`}
            type="button"
          >
            {active && <div className={styles.MobileIndicator} />}
            <Icon className={styles.MobileIcon} strokeWidth={1.5} />
            <span className={styles.MobileLabel}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
