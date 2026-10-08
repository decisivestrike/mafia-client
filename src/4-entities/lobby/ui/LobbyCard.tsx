'use client';

import { font } from '@shared/config/fonts';
import { Button } from '@shared/ui';
import { Separator } from '@shared/ui/Separator/Separator';
import { cn } from 'cn';
import styles from './lobby-card.module.css';

import type { Lobby } from '../model/lobby';

interface Props {
  lobby: Lobby;
}

function getAdminName(lobby: Lobby): string {
  const admin = lobby.participants.find(
    participant => participant.id === lobby.adminId,
  );

  return admin?.name ?? 'Неизвестно';
}

function CardLine({ name, value }: { name: string; value: string }) {
  return (
    <div className={cn(styles.Line, font.mono)}>
      <span className={styles.Name}>{name}</span>
      <span className={styles.Value}>{value}</span>
    </div>
  );
}

export function LobbyCard({ lobby }: Props) {
  const adminName = getAdminName(lobby);

  return (
    <div className={styles.Root}>
      <h5>Названия</h5>
      <Separator orientation="horizontal" className={styles.Separator} />
      <CardLine name="Глава" value={adminName} />
      <CardLine
        name="Игроки"
        value={`${lobby.participants.length} / ${lobby.maxPlayers}`}
      />
      <Button className={styles.Button}>Войти</Button>
    </div>
  );
}
