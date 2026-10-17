import { GameCreationForm } from '@/entities/game/features/game-creation/components/GameCreationForm';
import { BoundedPage } from '@/shared/ui/BoundedPage/BoundedPage';

export function GameCreationPage() {
  return (
    <BoundedPage maxWidth="72rem">
      <GameCreationForm />
    </BoundedPage>
  );
}
