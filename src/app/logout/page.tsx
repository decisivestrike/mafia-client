'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import styles from './logout.module.css';
import { logout } from '@/features/auth';
import { Button } from '@/shared/ui';
import { Card } from '@/shared/ui/Card';
import { Center } from '@/shared/ui/Center';

const linkToProfile = <Link href="/profile" />;

export default function LogoutPage() {
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    await logout();
    router.push('/login');
  }, [router]);

  return (
    <Center>
      <main className={styles.Main}>
        <h1 className={styles.Title}>Выход из города</h1>
        <Card className={styles.Card}>
          <p className={styles.P}>Вы уже вошли в игру, но пытаетесь зайти снова.</p>
          <p className={styles.P}>Если хотите продолжить — вернитесь в город.</p>
          <p className={styles.P}>Если решили уйти — попрощайтесь.</p>
          <p className={styles.P}>Мафия не терпит нерешительности.</p>
          <div className={styles.Actions}>
            <Button render={linkToProfile} nativeButton={false} variant="primary">
              Продолжить
            </Button>
            <Button variant="secondary" onClick={handleLogout}>
              Выйти
            </Button>
          </div>
        </Card>
      </main>
    </Center>
  );
}
