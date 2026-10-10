'use client';

import { usePathname, useRouter } from 'next/navigation';
import { isActiveItem, navItems } from '../shared';
import styles from './mobile-navbar.module.css';

export function MobileNavbar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className={styles.MobileNav}>
      {navItems.map(item => {
        const Icon = item.icon;
        const active = isActiveItem(pathname, item.path);

        return (
          <button
            key={item.path}
            className={`${styles.MobileItem} ${active ? styles.MobileItemActive : ''}`.trim()}
            // oxlint-disable-next-line react-perf/jsx-no-new-function-as-prop
            onClick={() => router.push(item.path)}
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
