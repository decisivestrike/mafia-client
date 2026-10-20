import { Separator as SeparatorBase } from '@base-ui/react';
import styles from './separator.module.css';

export function Separator({ className, ...props }: SeparatorBase.Props) {
  const orientation = props.orientation ?? 'horizontal';

  const orientationClass =
    orientation === 'horizontal' ? styles.Horizontal : styles.Vertical;

  return (
    <SeparatorBase
      className={`${styles.Separator} ${orientationClass} ${(className ?? '') as string}`}
      {...props}
    />
  );
}
