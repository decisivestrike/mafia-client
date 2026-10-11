import styles from './centerbox.module.css';
import { cn } from '@/shared/lib/utils';

import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export function CenterBox({ className, children }: Props) {
  return <div className={cn(styles.CenterBox, className)}>{children}</div>;
}
