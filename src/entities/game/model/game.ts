import type { User } from '@/entities/user';

export interface Game {
  id: string;
  adminId: string;
  maxPlayers: number;
  participants: User[];
  status: string;
}
