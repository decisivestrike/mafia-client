import { cva, type VariantProps } from 'class-variance-authority';
import { RevolverCylinder } from './RevolverCylinder';
import styles from './spinner.module.css';
import { cn } from '@/shared/lib/utils';

const spinnerVariant = cva(styles.Base, {
  variants: {
    size: {
      large: styles.Large,
    },
  },
  defaultVariants: {
    size: 'large',
  },
});

export type SpinnerProps = {
  className?: string;
} & VariantProps<typeof spinnerVariant>;

export function Spinner({ size, className }: SpinnerProps) {
  return <RevolverCylinder className={cn(spinnerVariant({ size }), className)} />;
}
