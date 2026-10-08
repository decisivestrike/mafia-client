'use client';

import { Button } from '@shared/components';
import { Separator } from '@shared/components/Separator/Separator';

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
    <div className="font-mono text-sm flex items-center justify-between">
      <span className="gap-2 tracking-wider flex items-center">
        {/* <Clock className="h-4 w-4" strokeWidth={1.5} /> */}
        {name}
      </span>
      <span className="tracking-wider">{value}</span>
    </div>
  );
}

export function LobbyCard({ lobby }: Props) {
  const adminName = getAdminName(lobby);

  return (
    <div className="min-w-72 gap-1 p-3 flex flex-col border">
      <h5>Названия</h5>
      <Separator orientation="horizontal" className="mb-1 h-px" />
      <CardLine name="Глава" value={adminName} />
      <CardLine
        name="Игроки"
        value={`${lobby.participants.length} / ${lobby.maxPlayers}`}
      />
      <Button className="mt-2">Войти</Button>
    </div>
  );
}
