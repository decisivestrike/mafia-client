'use client';

import { cn } from 'cn';
import styles from './profile-info.module.css';
import { type User } from '@/entities/user';
import { font } from '@/shared/config/fonts';

interface Props {
  user: User;
}

export default function ProfileInfo({ user: { name, id, email } }: Props) {
  return (
    <div className={styles.Info}>
      <div className={styles.NameBlock}>
        <div className={cn(styles.Label, font.mono)}>Оперативный псевдоним</div>
        <h1>{name}</h1>
      </div>
      <div className={styles.Row}>
        Идентификатор:{' '}
        <span className={cn(styles.Value, font.mono.className)}>{id}</span>
      </div>
      <div className={styles.Row}>
        Почта: <span className={cn(styles.Value, font.mono.className)}>{email}</span>
      </div>
    </div>
  );
}
