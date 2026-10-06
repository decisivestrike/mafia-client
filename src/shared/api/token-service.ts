import { fetchApi } from './utils';

import type { ApiError } from './error';

export interface AccessTokenResponse {
  accessToken: string;
}

export class RefreshError extends Error {}

export class TokenService {
  private refreshPromise: Promise<string> | null = null;
  private accessToken: string | null = null;

  getAccessToken() {
    return this.accessToken;
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  deleteAccessToken() {
    this.accessToken = null;
  }

  /**
   * Обновляет токены и возвращает accessToken
   * @throws при ошибке сети
   */
  refreshTokens(): Promise<string> {
    if (this.refreshPromise !== null) {
      return this.refreshPromise;
    }

    this.refreshPromise = this.createRefreshPromise();

    return this.refreshPromise;
  }

  private async createRefreshPromise(): Promise<string> {
    try {
      const response = await fetchApi('/user/refresh', {
        method: 'POST',
        credentials: 'include', // refresh-токен в httpOnly cookie
      });

      if (!response.ok) {
        const data = (await response.json()) as ApiError;
        this.accessToken = null;

        throw new RefreshError(`Не могу обновить токены: ${data.detail}`);
      }

      const data = (await response.json()) as AccessTokenResponse;
      this.setAccessToken(data.accessToken);

      return data.accessToken as string;
    } finally {
      this.refreshPromise = null;
    }
  }
}

export const tokenService = new TokenService();
