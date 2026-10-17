import { atom, useAtomValue, useSetAtom } from 'jotai';
import { deleteCookie, setCookie, type CookieOptions } from '@/shared/lib/cookie';

const cookieKeyName = 'gameId';

const cookieOptions: CookieOptions = {
  path: '/',
  sameSite: 'Strict',
};

const gameIdAtom = atom<string | null>(null);

export function useGameIdActions() {
  const setGameId = useSetAtom(gameIdAtom);

  function removeGameId() {
    setGameId(null);
    deleteCookie(cookieKeyName, cookieOptions);
  }

  return {
    setGameId: (id: string) => {
      setGameId(id);
      setCookie(cookieKeyName, id, cookieOptions);
    },
    removeGameId,
  };
}

export function useGameId() {
  return useAtomValue(gameIdAtom);
}
