'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { AvatarEditor } from './AvatarEditor';
import styles from './profile-edit-card.module.css';
import { Button } from '@/shared/ui';
import { Card } from '@/shared/ui/Card';

export function ProfileEditCard() {
  const router = useRouter();

  const goBack = useCallback(() => {
    router.push('/profile');
  }, [router]);

  return (
    <Card className={styles.Root}>
      <section className={styles.Section}>
        <div className={styles.Label}>Аватар</div>
        <AvatarEditor />
        <p className={styles.Hint}>
          Нажмите на аватар, чтобы загрузить изображение. Поддерживаются JPG, PNG и
          WebP, итоговый аватар — до 5 МБ.
        </p>
      </section>

      <div className={styles.Actions}>
        <Button variant="secondary" onClick={goBack}>
          Назад
        </Button>
      </div>
    </Card>
  );
}
