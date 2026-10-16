import styles from './page.module.css';
import { GameCreationForm } from '@/entities/game/features/game-creation/components/GameCreationForm';
import { MainPageWrapper } from '@/shared/ui/MainPageWrapper/MainPageWrapper';

export default function CreateLobbyPage() {
  return (
    <MainPageWrapper className={styles.Wrapper}>
      <GameCreationForm />
    </MainPageWrapper>
  );
}
