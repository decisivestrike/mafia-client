'use client';

import { Avatar } from '@shared/ui/Avatar/Avatar';
import { useMemo } from 'react';
import styles from './user-avatar.module.css';

interface Props {
  name: string;
}

function generateFallbackText(name: string): string {
  const parts = name.split(' ');

  if (parts.length === 1) {
    const firstPart = parts[0];

    if (firstPart.length <= 5) {
      return firstPart;
    }
  }

  return parts.map(part => part[0]).join('');
}

export function UserAvatar({ name }: Props) {
  const fallbackText = useMemo(() => generateFallbackText(name), [name]);

  return (
    <Avatar.Root className={styles.Avatar}>
      <Avatar.Image width="128" height="128" className={styles.Avatar} />
      <Avatar.Fallback>{fallbackText}</Avatar.Fallback>
    </Avatar.Root>
  );
}
