'use client';

import { type User } from '@/entities/user';

interface Props {
  user: User;
}

export default function ProfileInfo({ user: { name, id, email } }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <div className="mb-2">
        <div className="font-mono text-[10px]">Оперативный псевдоним</div>
        <h3>{name}</h3>
      </div>
      <div className="text-sm">
        Идентификатор: <span className="font-mono text-xs">{id}</span>
      </div>
      <div className="text-sm">
        Почта: <span className="font-mono text-xs">{email}</span>
      </div>
    </div>
  );
}
