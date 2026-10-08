'use client';

import { Button } from '@shared/ui';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export function CreateLobbyButton() {
  const router = useRouter();

  const goToCreationPage = useCallback(
    () => router.push('/lobbies/create'),
    [router],
  );

  return <Button onClick={goToCreationPage}>Создать</Button>;
}
