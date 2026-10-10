import styles from './loading.module.css';
import { Spinner } from '@/shared/ui';

export default function RootLoading() {
  return (
    <div className={styles.Container}>
      <Spinner />
    </div>
  );
}
