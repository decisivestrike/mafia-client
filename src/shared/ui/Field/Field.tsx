import { Field as FieldBase } from '@base-ui/react/field';
import { cn } from 'cn';
import styles from './field.module.css';
import { font } from '@/shared/config/fonts';

export namespace Field {
  export function Root({ className, ...props }: FieldBase.Root.Props) {
    return (
      <FieldBase.Root
        className={cn(styles.field, font.body.className, className)}
        {...props}
      />
    );
  }

  export function Label({ className, ...props }: FieldBase.Label.Props) {
    return (
      <FieldBase.Label
        className={cn(styles.label, font.body.className, className)}
        {...props}
      />
    );
  }

  export function Control({ className, ...props }: FieldBase.Control.Props) {
    return (
      <FieldBase.Control
        className={cn(styles.input, font.mono.className, className)}
        {...props}
      />
    );
  }

  export function Error({ className, ...props }: FieldBase.Error.Props) {
    return (
      <FieldBase.Error
        className={cn(styles.error, font.body.className, className)}
        {...props}
      />
    );
  }
}
