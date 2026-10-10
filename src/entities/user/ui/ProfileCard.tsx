'use client';

import { useQuery } from '@tanstack/react-query';
import { profileInfoOptions } from '../api/get-profile-info';
import styles from './profile-card.module.css';
import ProfileInfo from './ProfileInfo';
import { UserAvatar } from './UserAvatar';
import { Button, Spinner } from '@/shared/ui';
import { Stamp } from '@/shared/ui/Stamp/Stamp';

export function ProfileCard() {
  const { data, error, isPending, isError } = useQuery(profileInfoOptions);

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className={styles.Root}>
      <UserAvatar name={data.name} />
      <section className={styles.Section}>
        <ProfileInfo user={data} />
        <div className={styles.Actions}>
          <Button>Редактировать</Button>
          <Button variant="secondary">Выйти</Button>
          <Stamp className={styles.Stamp} />
        </div>
      </section>
    </div>
  );
}
