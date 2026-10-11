import styles from './page.module.css';
import { GameCreationButton } from '@/entities/game/components/GameCreationButton/CreateLobbyButton';
import { LobbyList } from '@/entities/game/components/LobbyList';
import { Heading } from '@/shared/ui/Heading/Heading';

export default function GamesPage() {
  return (
    <div className={styles.Wrapper}>
      <Heading>Операции</Heading>
      <div>
        <GameCreationButton />
      </div>
      <LobbyList />
    </div>
  );
}
