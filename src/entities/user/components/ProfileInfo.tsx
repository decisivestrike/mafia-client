'use client';

import { useQuery } from '@tanstack/react-query';
import { getMe } from '../api/get-me';

export default function ProfileInfo() {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getMe(),
  });

  if (isPending) {
    return <span>Загрузка...</span>;
  }

  if (isError) {
    return <span>Ошибка: {error.message}</span>;
  }

  return (
    <div>
      <h2>{data.name}</h2>
      <p className="font-mono text-xs">{data.id}</p>
      <p>{data.email}</p>
    </div>
  );
}
