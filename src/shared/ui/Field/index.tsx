import { Field as FieldBase } from '@base-ui/react/field';
import styles from './field.module.css';
import { cn } from '@/shared/lib/utils';

export namespace Field {
  export function Root({ className, ...props }: FieldBase.Root.Props) {
    return (
      <FieldBase.Root className={cn(styles.Field, className as string)} {...props} />
    );
  }

  export function Label({ className, ...props }: FieldBase.Label.Props) {
    return (
      <FieldBase.Label
        className={cn(styles.Label, className as string)}
        {...props}
      />
    );
  }

  export function Control({ className, ...props }: FieldBase.Control.Props) {
    return (
      <FieldBase.Control
        className={cn(styles.Input, className as string)}
        {...props}
      />
    );
  }

  export function Error({ className, ...props }: FieldBase.Error.Props) {
    return (
      <FieldBase.Error
        className={cn(styles.Error, className as string)}
        {...props}
      />
    );
  }
}
