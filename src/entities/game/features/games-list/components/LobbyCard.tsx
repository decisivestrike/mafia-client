'use client';

import styles from './lobby-card.module.css';
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
  const adminName = getAdminName(lobby);

  return (
    <Card className={styles.Root}>
      <h5>Названия</h5>
      <Separator orientation="horizontal" className={styles.Separator} />
      <CardLine name="Глава" value={adminName} />
      <CardLine
        name="Игроки"
        value={`${lobby.participants.length} / ${lobby.maxPlayers}`}
      />
      <Button className={styles.Button}>Войти</Button>
    </Card>
  );
}
