import { cn } from 'cn';
import styles from './spinner.module.css';

interface Props {
  className?: string;
}

export function Spinner({ className }: Props) {
  return (
    <div className={cn(styles.Spinner, className)}>
      {/* oxlint-disable-next-line next/no-img-element */}
      <img
        src="/assets/revolver-cylinder.svg"
        alt="Spinner"
        width="64"
        height="64"
      />
    </div>
  );
}
