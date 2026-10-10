import { ToggleGroup as BaseToggleGroup } from '@base-ui/react';
import { cn } from 'cn';
import styles from './toggle-group.module.css';

export function ToggleGroup<T extends string>({
  className,
  ...props
}: BaseToggleGroup.Props<T>) {
  return <BaseToggleGroup<T> className={cn(styles.group, className)} {...props} />;
}
