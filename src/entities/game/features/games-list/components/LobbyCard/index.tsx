'use client';

import { useRouter } from 'next/navigation';
import styles from './lobby-card.module.css';
import { useGameIdActions } from '@/entities/game/stores/game-id-store';
import { Button } from '@/shared/ui';
import { Card } from '@/shared/ui/Card';
import { Separator } from '@/shared/ui/Separator';

import type { Game } from '@/entities/game/model/game';

interface Props {
  lobby: Game;
}

function getAdminName(lobby: Game): string {
  const admin = lobby.participants.find(
    participant => participant.id === lobby.adminId,
  );

  return admin?.name ?? 'Неизвестно';
}

function CardLine({ name, value }: { name: string; value: string }) {
  return (
    <div className={styles.Line}>
      <span className={styles.Name}>{name}</span>
      <span className={styles.Value}>{value}</span>
    </div>
  );
}

export function LobbyCard({ lobby }: Props) {
  const router = useRouter();
  const { setGameId } = useGameIdActions();

  const adminName = getAdminName(lobby);

  const connectToLobby = () => {
    setGameId(lobby.id);
    router.replace(`/game/${lobby.id}`);
  };

  return (
    <Card className={styles.Root}>
      <h5>Названия</h5>
      <Separator orientation="horizontal" className={styles.Separator} />
      <CardLine name="Глава" value={adminName} />
      <CardLine
        name="Игроки"
        value={`${lobby.participants.length} / ${lobby.maxPlayers}`}
      />
      <Button className={styles.Button} onClick={connectToLobby}>
        Войти
      </Button>
    </Card>
  );
}
