import { Separator as SeparatorBase } from '@base-ui/react';
import { cn } from 'cn';
import styles from './separator.module.css';

export function Separator({ className, ...props }: SeparatorBase.Props) {
  return <SeparatorBase className={cn(styles.separator, className)} {...props} />;
}
