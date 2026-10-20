import { Avatar as AvatarBase } from '@base-ui/react';
import styles from './avatar.module.css';
import { cn } from '@/shared/lib/utils';

export namespace Avatar {
  export function Root({ className, ...props }: AvatarBase.Root.Props) {
    return (
      <AvatarBase.Root className={cn(styles.Root, className as string)} {...props} />
    );
  }

  export function Fallback({ className, ...props }: AvatarBase.Fallback.Props) {
    return (
      <AvatarBase.Fallback
        className={cn(styles.Fallback, className as string)}
        {...props}
      />
    );
  }

  export function Image({ className, ...props }: AvatarBase.Image.Props) {
    return (
      <AvatarBase.Image
        className={cn(styles.Image, className as string)}
        {...props}
      />
    );
  }
}
