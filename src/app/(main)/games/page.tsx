import styles from './page.module.css';
import { CreateGameButton } from '@/entities/game/ui/CreateLobbyButton';
import { LobbyList } from '@/entities/game/ui/LobbyList';

export default function LobbiesPage() {
  return (
    <div className={styles.Page}>
      <LobbyList />
      <CreateGameButton />
    </div>
  );
}
