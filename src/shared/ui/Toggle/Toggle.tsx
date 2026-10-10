import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import { cn } from 'cn';
import styles from './toggle.module.css';

export function Toggle<Value extends string>({
  className,
  ...props
}: BaseToggle.Props<Value>) {
  return <BaseToggle<Value> className={cn(styles.toggle, className)} {...props} />;
}
