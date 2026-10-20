import { ReturnButton } from '../components/ReturnButton';
import { GameCreationForm } from '@/entities/game/features/game-creation/components/GameCreationForm';
import { BoundedPage } from '@/shared/ui/BoundedPage';
import { Heading } from '@/shared/ui/Heading';

export function GameCreationPage() {
  return (
    <BoundedPage maxWidth="42rem">
      <ReturnButton />
      <Heading>Новая операция</Heading>
      <GameCreationForm />
    </BoundedPage>
  );
}
