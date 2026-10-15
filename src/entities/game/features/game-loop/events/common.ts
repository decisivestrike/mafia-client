import type { User } from '@/entities/user';

export type Team = 'None' | 'CitizenTeam' | 'MafiaTeam' | 'Neutral';

export type Role =
  | 'Citizen'
  | 'MafiaMember'
  | 'Sheriff'
  | 'Doctor'
  | 'MafiaDon'
  | 'Prostitute'
  | 'Maniac'
  | 'DeputySheriff'
  | 'Shapeshifter';

export type GameStatus = 'In progress' | 'Paused' | 'Finished';

export type GameStage = 'DayIntro' | 'DayTalk' | 'DayVote' | 'Night';

export interface Player extends User {
  isAlive: boolean;
}
