import type {
  GameActionRequestPayload,
  GameCommandPayload,
  GameDataPayload,
  GameInfoPayload,
  GameNewStagePayload,
  GameRolePayload,
  LobbyCommandPayload,
  LobbyDataPayload,
  UserConnectionMessagePayload,
} from './payloads';

export type Message = LobbyMessage | GameMessage | SystemMessage;

type LobbyMessage =
  | {
      topic: 'Lobby';
      messageType: 'Command';
      timestamp: string;
      payload: LobbyCommandPayload;
    }
  | {
      topic: 'Lobby';
      messageType: 'LobbyData';
      timestamp: string;
      payload: LobbyDataPayload;
    };

type GameMessage =
  | {
      topic: 'Game';
      messageType: 'Command';
      timestamp: string;
      payload: GameCommandPayload;
    }
  | {
      topic: 'Game';
      messageType: 'Info' | 'Error';
      timestamp: string;
      payload: GameInfoPayload;
    }
  | {
      topic: 'Game';
      messageType: 'ActionRequest';
      timestamp: string;
      payload: GameActionRequestPayload;
    }
  | {
      topic: 'Game';
      messageType: 'NewStage';
      timestamp: string;
      payload: GameNewStagePayload;
    }
  | {
      topic: 'Game';
      messageType: 'GameData';
      timestamp: string;
      payload: GameDataPayload;
    }
  | {
      topic: 'Game';
      messageType: 'Role';
      timestamp: string;
      payload: GameRolePayload;
    }
  | {
      topic: 'Game';
      messageType: 'GameStart' | 'GameFinish';
      timestamp: string;
      payload?: undefined;
    };

type SystemMessage =
  | {
      topic: 'System';
      messageType: 'UserConnect' | 'UserLeave';
      timestamp: string;
      payload: UserConnectionMessagePayload;
    }
  | {
      topic: 'System';
      messageType: 'Info' | 'Error';
      timestamp: string;
      payload: GameInfoPayload;
    };
