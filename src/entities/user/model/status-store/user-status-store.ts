import { createStore } from 'zustand/vanilla';

export type UserStatusState = {
  roomId: string | null;
  isLobby: boolean;
};

export type UserStatusActions = {
  dispatch: (action: Action) => void;
};

export type UserStatusStore = UserStatusState & UserStatusActions;

export type Action =
  | {
      type: 'game';
      roomId: string;
    }
  | {
      type: 'lobby';
      roomId: string;
    }
  | {
      type: 'idle';
    };

const userStatusReducer = (state: UserStatusState, action: Action) => {
  switch (action.type) {
    case 'game':
      return { roomId: action.roomId, isLobby: false };
    case 'lobby':
      return { roomId: action.roomId, isLobby: true };
    case 'idle':
      return { roomId: null, isLobby: false };
    default:
      return state;
  }
};

export function createUserStatusStore() {
  return createStore<UserStatusStore>(set => ({
    roomId: null,
    isLobby: false,

    dispatch: (action: Action) => set(state => userStatusReducer(state, action)),
  }));
}
