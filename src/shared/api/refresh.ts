import { url } from './url';

export interface JwtTokens {
  accessToken: string;
  refreshToken: string;
}

let refreshPromise: Promise<string> | null = null;
let accessToken: string | null = null;

export function getAccessToken() {
  return accessToken;
}

export class RefreshError extends Error {}

/**
 * Обновляет токены и возвращает accessToken
 * @throws при ошибке сети
 */
export function refreshTokens(): Promise<string> {
  if (refreshPromise !== null) return refreshPromise;

  refreshPromise = createRefreshPromise();

  return refreshPromise;
}

async function createRefreshPromise(): Promise<string> {
  try {
    const response = await fetch(url('/user/refresh'), {
      method: 'POST',
      credentials: 'include', // refresh-токен в httpOnly cookie
    });

    if (!response.ok) {
      accessToken = null;
      throw new RefreshError();
    }

    const data = await response.json();
    accessToken = data.accessToken;

    return data.accessToken as string;
  } finally {
    refreshPromise = null;
  }
}

// function reset(promise: Promise<string>): void {
//   if (refreshPromise === promise) {
//     refreshPromise = null;
//   }
// }
