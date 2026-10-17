import styles from './page.module.css';
import { GameCreationForm } from '@/entities/game/features/game-creation/components/GameCreationForm';

export default function CreateLobbyPage() {
  return (
    <div className={styles.Wrapper}>
      <GameCreationForm />
    </div>
  );
}
