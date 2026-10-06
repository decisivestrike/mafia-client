import { Separator as SeparatorBase } from '@base-ui/react';
import { cn } from 'cn';

export function Separator({ className, ...props }: SeparatorBase.Props) {
  return (
    <SeparatorBase
      className={cn('bg-neutral-300 dark:bg-neutral-700', className)}
      {...props}
    />
  );
}
