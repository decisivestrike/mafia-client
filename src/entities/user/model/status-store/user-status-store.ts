import { createStore } from 'zustand/vanilla';
import { deleteCookie, setCookie } from '@/shared/lib/cookie';

export type UserStatusState = {
  gameId: string | null;
};

export type UserStatusActions = {
  set: (id: string) => void;
  remove: () => void;
};

export type UserStatusStore = UserStatusState & UserStatusActions;

export type Action =
  | {
      type: 'playing';
      roomId: string;
    }
  | {
      type: 'idle';
    };

export type UserStatusReducer = (
  state: UserStatusState,
  action: Action,
) => Promise<UserStatusState>;

export function createUserStatusStore() {
  return createStore<UserStatusStore>()(set => ({
    gameId: null,

    set: id => {
      setCookie('gameId', id, { sameSite: 'Strict' });
      return set({ gameId: id });
    },
    remove: () => {
      deleteCookie('gameId', { sameSite: 'Strict' });
    },
  }));
}
