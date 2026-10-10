'use client';

import { cn } from 'cn';
import styles from './profile-info.module.css';
import { type User } from '@/entities/user';

interface Props {
  user: User;
}

export default function ProfileInfo({ user: { name, id, email } }: Props) {
  return (
    <div className={styles.Info}>
      <div className={styles.NameBlock}>
        <div className={cn(styles.Label)}>Оперативный псевдоним</div>
        <h1>{name}</h1>
      </div>
      <div className={styles.Row}>
        Идентификатор: <span className={cn(styles.Value)}>{id}</span>
      </div>
      <div className={styles.Row}>
        Почта: <span className={cn(styles.Value)}>{email}</span>
      </div>
    </div>
  );
}
