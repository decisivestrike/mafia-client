'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { Button } from '@/shared/components';

export function CreateLobbyButton() {
  const router = useRouter();

  const goToCreationPage = useCallback(
    () => router.push('/lobbies/create'),
    [router],
  );

  return <Button onClick={goToCreationPage}>Создать</Button>;
}
