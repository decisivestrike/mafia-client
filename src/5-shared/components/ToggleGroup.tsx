import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group';
import { cn } from 'cn';

export function ToggleGroup<T extends string>({
  className,
  ...props
}: BaseToggleGroup.Props<T>) {
  return (
    <BaseToggleGroup<T>
      className={cn(
        'flex gap-px border border-neutral-950 p-px dark:border-white',
        className,
      )}
      {...props}
    />
  );
}
