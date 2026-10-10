'use client';

import { HatGlasses } from 'lucide-react';
import styles from './user-avatar.module.css';
import { Avatar } from '@/shared/ui/Avatar/Avatar';

export function UserAvatar() {
  return (
    <Avatar.Root className={styles.Avatar}>
      <Avatar.Image width="128" height="128" className={styles.Avatar} />
      <Avatar.Fallback>
        <HatGlasses size={64} color="lightgray" />
      </Avatar.Fallback>
    </Avatar.Root>
  );
}
