'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { Button } from '@/shared/ui';

/** Переход на страницу создания игры */
export function GameCreationButton() {
  const router = useRouter();
  const goToCreationPage = useCallback(() => {
    router.push('/game/create');
  }, [router]);

  return <Button onClick={goToCreationPage}>Создать</Button>;
}
