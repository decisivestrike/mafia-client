import { Input } from '@base-ui/react';
import { LobbyList } from '../components/LobbyList';
import styles from './games-page.module.css';
import { GameCreationButton } from '@/entities/game/features/game-creation/components/CreateGameButton';
import { BoundedPage } from '@/shared/ui/BoundedPage';
import { Heading } from '@/shared/ui/Heading';

export function GamesPage() {
  return (
    <BoundedPage maxWidth="72rem" className={styles.Wrapper}>
      <Heading>Операции</Heading>
      <div className={styles.Group}>
        <Input className={styles.Search} placeholder="Поиск" />
        <GameCreationButton />
      </div>
      <LobbyList />
    </BoundedPage>
  );
}
