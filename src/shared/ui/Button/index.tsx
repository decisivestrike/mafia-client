import { Button as ButtonBase } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import styles from './button.module.css';
import { cn } from '@/shared/lib/utils';

const buttonVariant = cva(styles.Base, {
  variants: {
    variant: {
      primary: styles.Primary,
      secondary: styles.Secondary,
      text: styles.Text,
    },
    size: {
      small: styles.Small,
      medium: styles.Medium,
      large: styles.Large,
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'medium',
  },
});

export type ButtonProps = ButtonBase.Props & VariantProps<typeof buttonVariant>;

export default function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <ButtonBase
      className={cn(buttonVariant({ variant, size }), className as string)}
      {...props}
    />
  );
}
