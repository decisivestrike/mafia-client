import { Button as ButtonBase } from '@base-ui/react/button';
import { cn } from 'cn';
import styles from './button.module.css';
import { font } from '@/shared/config/fonts';

export default function Button({ className, ...props }: ButtonBase.Props) {
  return (
    <ButtonBase
      className={cn(styles.Button, font.body.className, className)}
      {...props}
    />
  );
}
