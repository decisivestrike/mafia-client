import { CreateLobbyButton } from '@/entities/lobby/components/CreateLobbyButton';
import { LobbyList } from '@/entities/lobby/components/LobbyList';

export default function LobbiesPage() {
  return (
    <div className="flex flex-col gap-5">
      <LobbyList />
      <CreateLobbyButton />
    </div>
  );
}
