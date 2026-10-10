import { Field as FieldBase } from '@base-ui/react/field';
import { cn } from 'cn';
import styles from './field.module.css';

export namespace Field {
  export function Root({ className, ...props }: FieldBase.Root.Props) {
    return <FieldBase.Root className={cn(styles.field, className)} {...props} />;
  }

  export function Label({ className, ...props }: FieldBase.Label.Props) {
    return <FieldBase.Label className={cn(styles.label, className)} {...props} />;
  }

  export function Control({ className, ...props }: FieldBase.Control.Props) {
    return <FieldBase.Control className={cn(styles.input, className)} {...props} />;
  }

  export function Error({ className, ...props }: FieldBase.Error.Props) {
    return (
      <FieldBase.Error
        className={`${styles.error} ${className as string}`}
        {...props}
      />
    );
  }
}
