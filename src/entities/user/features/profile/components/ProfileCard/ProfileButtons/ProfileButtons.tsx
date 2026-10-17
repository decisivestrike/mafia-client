'use client';

import { Toast } from '@base-ui/react';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useTransition } from 'react';
import styles from './profile-buttons.module.css';
import { logout } from '@/features/auth';
import { Button } from '@/shared/ui';

export function ProfileButtons() {
  const router = useRouter();
  const toastManager = Toast.useToastManager();
  const [isPending, startTransition] = useTransition();

  const logoutWithRedirect = useCallback(
    () =>
      startTransition(async () => {
        await logout().then(error => {
          if (error === null) {
            router.replace('/login');
          } else {
            toastManager.add({
              data: 'Дверь заклинило',
              description: 'Не могу выйти из аккаунта',
            });
          }
        });
      }),
    [router, toastManager, startTransition],
  );

  return (
    <div className={styles.Actions}>
      <Button>Редактировать</Button>
      <Button variant="secondary" onClick={logoutWithRedirect} disabled={isPending}>
        <LogOut className={styles.LogoutIcon} />
        Выйти
      </Button>
    </div>
  );
}
