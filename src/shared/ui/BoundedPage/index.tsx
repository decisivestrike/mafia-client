import styles from './bounded-page.module.css';
import { cn } from '@/shared/lib/utils';

import type { CSSProperties, ReactNode } from 'react';

type E = 'px' | 'rem' | 'em' | '%';
type Size = `${string}${E}`;

type BoundedPageProps = {
  maxWidth?: Size;
  className?: string;
  children?: ReactNode;
};

export function BoundedPage({ className, maxWidth, children }: BoundedPageProps) {
  // oxlint-disable-next-line react-perf/jsx-no-new-object-as-prop
  const vars = {
    '--page-max-width': maxWidth,
  } as CSSProperties;

  return (
    <div className={cn(styles.Page, className)} style={vars}>
      {children}
    </div>
  );
}
