import { Button as ButtonBase } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import styles from './button.module.css';
import { concat } from '@/shared/lib/utils';

const buttonVariant = cva(styles.Base, {
  variants: {
    variant: {
      primary: styles.Primary,
      secondary: styles.Secondary,
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export type ButtonProps = ButtonBase.Props & VariantProps<typeof buttonVariant>;

export default function Button({ variant, className, ...props }: ButtonProps) {
  return (
    <ButtonBase
      className={concat(buttonVariant({ variant }), className as string)}
      {...props}
    />
  );
}
