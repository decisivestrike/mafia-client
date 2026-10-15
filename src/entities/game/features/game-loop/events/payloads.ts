import type { GameStage, GameStatus, Player, Role, Team } from './common';
import type { Lobby } from '@/entities/game';
import type { User } from '@/entities/user';

// -------- Lobby --------
export interface LobbyCommandPayload {
  actionType: 'Kick' | 'Start' | 'Delete' | 'Leave';
  targetId: string | null;
  roomId: string;
  roleSet: Role[] | null;
}

export interface LobbyDataPayload {
  id: string;
  participants: User[];
  adminId: string;
  maxPlayers: number;
}

// -------- Game --------
export interface GameCommandPayload {
  actionType: 'Vote' | 'RoleAction' | 'EndTalk' | 'Leave';
  targetId: string | null;
  roomId: string;
}

export interface GameInfoPayload {
  text: string;
}

export interface GameActionRequestPayload {
  text: string;
  timeout: number; // секунды
}

export interface GameNewStagePayload {
  newStage: GameStage;
  text: string;
}

export interface GameDataPayload {
  id: string;
  players: Player[];
  admin: Player;
  startDate: string; // ISO datetime
  assignedRole: Role;
  winnerTeam: Team | null;
  gameStatus: GameStatus;
  gameStage: GameStage;
  finishDate: string | null; // ISO datetime
  roundCount: number;
}

export interface GameRolePayload {
  text: string;
  role: Role;
}

// -------- System --------
export interface UserConnectionMessagePayload {
  text: string;
  user: User;
  lobby: Lobby | null;
}
