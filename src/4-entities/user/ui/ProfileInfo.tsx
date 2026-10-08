'use client';

import { type User } from '@entities/user';
import { font } from '@shared/config/fonts';
import { cn } from 'cn';
import styles from './profile-info.module.css';

interface Props {
  user: User;
}

export default function ProfileInfo({ user: { name, id, email } }: Props) {
  return (
    <div className={styles.Info}>
      <div className={styles.NameBlock}>
        <div className={cn(styles.Label, font.mono)}>Оперативный псевдоним</div>
        <h3>{name}</h3>
      </div>
      <div className={styles.Row}>
        Идентификатор: <span className={cn(styles.Value, font.mono)}>{id}</span>
      </div>
      <div className={styles.Row}>
        Почта: <span className={cn(styles.Value, font.mono)}>{email}</span>
      </div>
    </div>
  );
}
