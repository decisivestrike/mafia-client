'use client';

import { useRouter, usePathname } from 'next/navigation';
import { isActiveItem, navItems } from '../shared';
import styles from './desktop-navbar.module.css';

export function DesktopNavbar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className={styles.Header}>
      <div className={styles.Inner}>
        <div className={styles.LogoText}>Мафия</div>
        <nav className={styles.Nav}>
          {navItems.map(item => {
            const Icon = item.icon;
            const active = isActiveItem(pathname, item.path);

            return (
              <button
                key={item.path}
                className={`${styles.NavButton} ${active ? styles.NavButtonActive : ''}`.trim()}
                type="button"
                // oxlint-disable-next-line react-perf/jsx-no-new-function-as-prop
                onClick={() => router.push(item.path)}
              >
                <Icon className={styles.NavIcon} strokeWidth={1.5} />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className={styles.ActiveIndicator} />
        </nav>
      </div>
    </header>
  );
}
