import styles from './page.module.css';
import { CreateGameButton } from '@/entities/game/components/CreateLobbyButton';
import { LobbyList } from '@/entities/game/components/LobbyList';

export default function LobbiesPage() {
  return (
    <div className={styles.Page}>
      <LobbyList />
      <CreateGameButton />
    </div>
  );
}
