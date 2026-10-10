import { ToggleGroup as BaseToggleGroup } from '@base-ui/react';

export function ToggleGroup<T extends string>({
  className,
  ...props
}: BaseToggleGroup.Props<T>) {
  return <BaseToggleGroup<T> className={className} {...props} />;
}
