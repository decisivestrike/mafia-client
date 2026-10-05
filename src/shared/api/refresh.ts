import { url } from './url';

import type { ApiError } from './error';

export interface AccessTokenResponse {
  accessToken: string;
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
    const response = await fetch(url('/user/refresh'), {
      method: 'POST',
      credentials: 'include', // refresh-токен в httpOnly cookie
    });

    if (!response.ok) {
      const data = (await response.json()) as ApiError;
      console.log('Data:', data);

      accessToken = null;
      throw new RefreshError('Не могу обновить токены');
    }

    const data = (await response.json()) as AccessTokenResponse;
    setAccessToken(data.accessToken);

    return data.accessToken as string;
  } finally {
    refreshPromise = null;
  }
}
