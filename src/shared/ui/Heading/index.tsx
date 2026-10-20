import styles from './heading.module.css';
import { Separator } from '@/shared/ui';

import type { ReactNode } from 'react';

export type HeadingProps = {
  children: ReactNode;
  className?: string;
};

export function Heading({ className, children }: HeadingProps) {
  return (
    <div className={className ?? ''}>
      <h1>{children}</h1>
      <Separator className={styles.Separator} />
    </div>
  );
}
