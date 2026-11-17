'use client';

import { useQuery } from '@tanstack/react-query';
import { HatGlasses } from 'lucide-react';
import styles from './profile-avatar.module.css';
import { avatarOptions } from '@/entities/user/api/get-avatar';
import { useObjectUrl } from '@/shared/lib';
import { Avatar } from '@/shared/ui/Avatar';

export function ProfileAvatar() {
  const { data: avatar } = useQuery(avatarOptions);
  const avatarUrl = useObjectUrl(avatar);

  return (
    <Avatar.Root className={styles.Avatar}>
      <Avatar.Image
        src={avatarUrl}
        alt="Аватар"
        width="128"
        height="128"
        className={styles.Avatar}
      />
      <Avatar.Fallback>
        <HatGlasses size={64} color="lightgray" />
      </Avatar.Fallback>
    </Avatar.Root>
  );
}
