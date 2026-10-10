import { cva, type VariantProps } from 'class-variance-authority';
import styles from './spinner.module.css';

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
  return (
    <div className={`${spinnerVariant({ size })} ${className}`}>
      {/* oxlint-disable-next-line next/no-img-element */}
      <img src="/assets/revolver-cylinder.svg" alt="Spinner" />
    </div>
  );
}
