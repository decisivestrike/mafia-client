import styles from './section-label.module.css';

import type { ReactNode } from 'react';

export function SectionLabel({ children }: { children: ReactNode }) {
  return <label className={styles.SectionName}>{children}</label>;
}
