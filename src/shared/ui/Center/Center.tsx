import styles from './center.module.css';
import { cn } from '@/shared/lib/utils';

import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export function Center({ className, children }: Props) {
  return <div className={cn(styles.Center, className)}>{children}</div>;
}
