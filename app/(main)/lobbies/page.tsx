import { CreateLobbyButton } from '@entities/lobby/ui/CreateLobbyButton';
import { LobbyList } from '@entities/lobby/ui/LobbyList';

export default function LobbiesPage() {
  return (
    <div className="flex flex-col items-center gap-5">
      <LobbyList />
      <CreateLobbyButton />
    </div>
  );
}
