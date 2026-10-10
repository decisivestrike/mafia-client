'use client';

import { Toast } from '@base-ui/react';
import styles from './toast.module.css';

export function ToastList() {
  const { toasts } = Toast.useToastManager();

  return toasts.map(toast => <ToastItem key={toast.id} toast={toast} />);
}

export function ToastItem({ toast }: { toast: Toast.Root.ToastObject }) {
  let pulseClassName: string | null = null;

  if (toast.updateKey) {
    pulseClassName = toast.updateKey % 2 === 0 ? styles.PulseEven : styles.PulseOdd;
  }

  const className = [styles.Toast, pulseClassName].filter(Boolean).join(' ');

  return (
    <Toast.Root key={toast.id} toast={toast} className={className}>
      <Toast.Content>
        <div>
          <Toast.Title />
          <Toast.Description />
        </div>
        <Toast.Close>Закрыть</Toast.Close>
      </Toast.Content>
    </Toast.Root>
  );
}
