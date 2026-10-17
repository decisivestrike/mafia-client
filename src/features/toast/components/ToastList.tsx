'use client';

import { Toast } from '@base-ui/react';
import styles from './toast.module.css';
import { cn } from '@/shared/lib/utils';
import Button from '@/shared/ui/Button/Button';

const toastButton = <Button />;

export function ToastList() {
  const { toasts } = Toast.useToastManager();

  return toasts.map(toast => <ToastItem key={toast.id} toast={toast} />);
}

export function ToastItem({ toast }: { toast: Toast.Root.ToastObject }) {
  let pulseClassName: string | null = null;

  if (toast.updateKey) {
    pulseClassName = toast.updateKey % 2 === 0 ? styles.PulseEven : styles.PulseOdd;
  }

  const className = cn(styles.Toast, pulseClassName);

  return (
    <Toast.Root key={toast.id} toast={toast} className={className}>
      <Toast.Content className={styles.Content}>
        <div className={styles.Text}>
          <Toast.Title className={styles.Title} />
          <Toast.Description className={styles.Description} />
        </div>
        <Toast.Close className={styles.Close} render={toastButton}>
          Закрыть
        </Toast.Close>
      </Toast.Content>
    </Toast.Root>
  );
}
