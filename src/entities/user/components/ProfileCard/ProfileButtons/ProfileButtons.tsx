'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import styles from './profile-buttons.module.css';
import { logout } from '@/features/auth';
import { Button } from '@/shared/ui';

export function ProfileButtons() {
  const router = useRouter();
  const logoutWithRedirect = useCallback(
    () =>
      void logout().then(ok => {
        if (ok) {
          router.replace('/login');
        }
      }),
    [router],
  );

  return (
    <div className={styles.Actions}>
      <Button>Редактировать</Button>
      <Button variant="secondary" onClick={logoutWithRedirect}>
        <LogOut className={styles.LogoutIcon} />
        Выйти
      </Button>
    </div>
  );
}
