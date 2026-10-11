import styles from './main-page-wrapper.module.css';
import { cn } from '@/shared/lib/utils';

import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

/** Задает одинаковый отступ для всех страниц в (main) */
export function MainPageWrapper({ className, children }: Props) {
  return <div className={cn(styles.Wrapper, className)}>{children}</div>;
}
