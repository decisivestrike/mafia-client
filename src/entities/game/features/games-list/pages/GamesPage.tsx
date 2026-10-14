import { LobbyList } from '../components/LobbyList';
import styles from './games-page.module.css';
import { GameCreationButton } from '@/entities/game/features/game-creation/components/GameCreationButton';
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
