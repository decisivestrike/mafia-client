'use client';

import { useQuery } from '@tanstack/react-query';
import { profileInfoOptions } from '../../../api/get-profile-info';
import styles from './profile-info.module.css';
import { Spinner } from '@/shared/ui';

export default function ProfileInfo() {
  const { data: user, error, isPending, isError } = useQuery(profileInfoOptions);

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className={styles.Info}>
      <div className={styles.Label}>Оперативный псевдоним</div>
      <h1>{user.name}</h1>
    </div>
  );
}
