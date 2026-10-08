import { font } from '@shared/config/fonts';
import { cn } from 'cn';
import styles from './stamp.module.css';

interface Props {
  className?: string;
  text?: string;
}

export function Stamp({ className, text = 'Конфиденциально' }: Props) {
  return (
    <div className={className}>
      <div className={styles.Stamp}>
        <p className={cn(styles.Text, font.mono)}>{text}</p>
      </div>
    </div>
  );
}
