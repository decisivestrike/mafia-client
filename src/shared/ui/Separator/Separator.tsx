import { Separator as SeparatorBase } from '@base-ui/react';
import styles from './separator.module.css';

export function Separator({ className, ...props }: SeparatorBase.Props) {
  const orientation = props.orientation ?? 'horizontal';

  const orientaionClass =
    orientation === 'horizontal' ? styles.Horizontal : styles.Vertical;

  return (
    <SeparatorBase
      className={`${styles.separator} ${orientaionClass} ${className as string}`}
      {...props}
    />
  );
}
