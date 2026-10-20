'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui';

export function ReturnButton() {
  const router = useRouter();

  return (
    <Button onClick={() => router.replace('/games')} variant="text" size="small">
      <ArrowLeft strokeWidth={1.5} size="16" />
      <span>Назад к операциям</span>
    </Button>
  );
}
