import { type ReactNode } from 'react';
import { GameIdInitializer } from '@/entities/user';

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      <GameIdInitializer />
      {children};
    </>
  );
}
