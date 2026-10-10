import styles from './stamp.module.css';

interface Props {
  className?: string;
  text?: string;
}

export function Stamp({ className, text = 'Конфиденциально' }: Props) {
  return (
    <div className={className}>
      <div className={styles.Stamp}>
        <p className={styles.Text}>{text}</p>
      </div>
    </div>
  );
}
