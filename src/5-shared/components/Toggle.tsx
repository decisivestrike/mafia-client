import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import { cn } from 'cn';
import { concat } from '../utils';

export type Props<Value extends string> = BaseToggle.Props<Value> & {
  variant?: 'primary' | 'secondary';
};

const base = concat(
  'flex items-center justify-center rounded-none border-none select-none focus-visible:outline-2',
  // light
  'text-neutral-950 hover:not-disabled:bg-neutral-100 focus-visible:outline-neutral-950',
  // dark
  'dark:text-white dark:hover:not-disabled:bg-neutral-800',
  'dark:focus-visible:outline-white',
);

const primary = concat(
  'focus-visible:outline-offset-1',
  // light
  'active:not-disabled:not-data-pressed:bg-neutral-200',
  'data-pressed:bg-neutral-950 data-pressed:text-white',
  'data-pressed:hover:not-disabled:bg-neutral-950 data-pressed:hover:not-disabled:text-white',
  // dark
  'dark:active:not-disabled:not-data-pressed:bg-neutral-700',
  'dark:data-pressed:bg-white dark:data-pressed:text-neutral-950',
  'dark:data-pressed:hover:not-disabled:bg-white dark:data-pressed:hover:not-disabled:text-neutral-950',
);

const secondary = concat(
  'focus-visible:-outline-offset-1',
  // light
  'active:not-disabled:bg-neutral-200 data-pressed:text-neutral-950',
  // dark
  'dark:active:not-disabled:bg-neutral-700 dark:data-pressed:text-white',
);

export function Toggle<Value extends string>({
  className,
  variant = 'primary',
  ...props
}: Props<Value>) {
  return (
    <BaseToggle<Value>
      className={cn(base, variant === 'primary' ? primary : secondary, className)}
      {...props}
    />
  );
}
