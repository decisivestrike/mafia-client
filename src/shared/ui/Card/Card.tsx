import styles from './card.module.css';
import { cn } from '@/shared/lib/utils';

import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
};

export function Card({ className, hover, children }: Props) {
  return (
    <div className={cn(styles.Card, hover ? styles.CardHover : '', className)}>
      {children}
    </div>
  );
}
