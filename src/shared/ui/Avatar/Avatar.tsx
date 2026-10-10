import { Avatar as AvatarBase } from '@base-ui/react';
import { cn } from 'cn';
import styles from './avatar.module.css';

export namespace Avatar {
  export function Root({ className, ...props }: AvatarBase.Root.Props) {
    return <AvatarBase.Root className={cn(styles.Root, className)} {...props} />;
  }

  export function Fallback({ className, ...props }: AvatarBase.Fallback.Props) {
    return (
      <AvatarBase.Fallback className={cn(styles.Fallback, className)} {...props} />
    );
  }

  export function Image({ className, ...props }: AvatarBase.Image.Props) {
    return <AvatarBase.Image className={cn(styles.Image, className)} {...props} />;
  }
}
