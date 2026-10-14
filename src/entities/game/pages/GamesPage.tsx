import styles from './games-page.module.css';
import { GameCreationButton } from '@/entities/game/components/GameCreationButton/CreateLobbyButton';
import { LobbyList } from '@/entities/game/components/LobbyList';
import { Heading } from '@/shared/ui/Heading/Heading';
import { MainPageWrapper } from '@/shared/ui/MainPageWrapper/MainPageWrapper';

export function GamesPage() {
  return (
    <MainPageWrapper className={styles.Wrapper}>
      <Heading>Операции</Heading>
      <div>
        <GameCreationButton />
      </div>
      <LobbyList />
    </MainPageWrapper>
  );
}
