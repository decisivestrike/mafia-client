import type { User } from '@entities/user';

export interface Lobby {
  id: string;
  adminId: string;
  maxPlayers: number;
  participants: User[];
  status: string;
}
