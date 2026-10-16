import { type ReactNode } from 'react';
import { GameIdInitializer, GameIdStoreProvider } from '@/entities/user';

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <GameIdStoreProvider>
      <GameIdInitializer />
      {children};
    </GameIdStoreProvider>
  );
}
