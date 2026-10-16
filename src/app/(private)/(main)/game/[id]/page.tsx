'use client';

import dynamic from 'next/dynamic';

const GamePage = dynamic(
  () =>
    import('@/entities/game/features/game-loop/pages/GamePage').then(
      m => m.GamePage,
    ),
  { ssr: false },
);

export default GamePage;
