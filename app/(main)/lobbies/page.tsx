import { CreateLobbyButton } from '@entities/lobby/ui/CreateLobbyButton';
import { LobbyList } from '@entities/lobby/ui/LobbyList';
import styles from './page.module.css';

export default function LobbiesPage() {
  return (
    <div className={styles.Page}>
      <LobbyList />
      <CreateLobbyButton />
    </div>
  );
}
