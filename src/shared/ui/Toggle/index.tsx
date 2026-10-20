import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import styles from './toggle.module.css';
import { cn } from '@/shared/lib/utils';

export function Toggle<Value extends string>({
  className,
  ...props
}: BaseToggle.Props<Value>) {
  return (
    <BaseToggle<Value>
      className={cn(styles.toggle, className as string)}
      {...props}
    />
  );
}
