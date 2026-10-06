import { Avatar as AvatarBase } from '@base-ui/react';
import { cn } from 'cn';

export namespace Avatar {
  export function Root({ className, ...props }: AvatarBase.Root.Props) {
    return (
      <AvatarBase.Root
        className={cn(
          'inline-flex size-12 items-center justify-center overflow-hidden align-middle text-sm leading-none font-normal select-none',
          // light
          'bg-neutral-200 text-neutral-950',
          // dark
          'dark:bg-neutral-800 dark:text-white',
          className,
        )}
        {...props}
      />
    );
  }

  export function Fallback({ className, ...props }: AvatarBase.Fallback.Props) {
    return (
      <AvatarBase.Fallback
        className={cn(
          'flex size-full items-center justify-center text-sm font-semibold uppercase',
          className,
        )}
        {...props}
      />
    );
  }

  export function Image({ className, ...props }: AvatarBase.Image.Props) {
    return (
      <AvatarBase.Image
        className={cn('size-full object-cover', className)}
        {...props}
      />
    );
  }
}
