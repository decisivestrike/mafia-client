'use client';

import { useQuery } from '@tanstack/react-query';
import { cva, type VariantProps } from 'class-variance-authority';
import { HatGlasses } from 'lucide-react';
import styles from './user-avatar.module.css';
import { avatarOptions } from '@/entities/user/api/get-avatar';
import { useObjectUrl } from '@/shared/lib';
import { cn } from '@/shared/lib/utils';
import { Avatar } from '@/shared/ui/Avatar';

const userAvatarVariants = cva(styles.Root, {
  variants: {
    size: {
      medium: styles.Medium,
      large: styles.Large,
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

export type UserAvatarProps = {
  className?: string;
} & VariantProps<typeof userAvatarVariants>;

export function UserAvatar({ size, className }: UserAvatarProps) {
  const { data: avatar } = useQuery(avatarOptions);
  const avatarUrl = useObjectUrl(avatar);

  return (
    <Avatar.Root className={cn(userAvatarVariants({ size }), className)}>
      <Avatar.Image src={avatarUrl} alt="Аватар" />
      <Avatar.Fallback>
        <HatGlasses size={size === 'large' ? 72 : 64} color="lightgray" />
      </Avatar.Fallback>
    </Avatar.Root>
  );
}
