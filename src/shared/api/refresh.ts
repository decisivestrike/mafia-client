import { url } from './url';

import type { ApiError } from './error';

export interface JwtTokens {
  accessToken: string;
  refreshToken: string;
}

let refreshPromise: Promise<string> | null = null;
let accessToken: string | null = null;

export function getAccessToken() {
  return accessToken;
}

export function setAccessToken(token: string) {
  accessToken = token;
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
    const refreshToken = localStorage.getItem('refreshToken');
    console.log(refreshToken);

    const response = await fetch(url('/user/refresh'), {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
      credentials: 'include', // refresh-токен в httpOnly cookie
    });

    if (!response.ok) {
      const data = (await response.json()) as ApiError;
      console.log(data.details);

      accessToken = null;
      throw new RefreshError('Не могу обновить токены');
    }

    const data = (await response.json()) as JwtTokens;
    accessToken = data.accessToken;
    localStorage.setItem('refreshToken', data.refreshToken);

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
