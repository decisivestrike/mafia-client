import { createStore } from 'zustand/vanilla';
import { deleteCookie, setCookie, type CookieOptions } from '@/shared/lib/cookie';

export type GameIdState = {
  gameId: string | null;
};

export type GameIdActions = {
  set: (id: string) => void;
  remove: () => void;
};

export type GameIdStore = GameIdState & GameIdActions;

const cookieKeyName = 'gameId';

const cookieOptions: CookieOptions = {
  sameSite: 'Strict',
};

function setGameIdToCookie(id: string) {
  setCookie(cookieKeyName, id, cookieOptions);
}

function removeGameIdFromCookie() {
  deleteCookie(cookieKeyName, cookieOptions);
}

export function createGameIdStore() {
  return createStore<GameIdStore>()(set => ({
    gameId: null,

    set: id => {
      setGameIdToCookie(id);
      return set({ gameId: id });
    },
    remove: () => {
      removeGameIdFromCookie();
      return set({ gameId: null });
    },
  }));
}
