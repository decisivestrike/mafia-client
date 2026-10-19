import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { RefreshError, TokenService } from './token-service';

interface MockResponse {
  ok: boolean;
  status: number;
  json: () => Promise<{ detail?: string; accessToken?: string }>;
}

function mockFetch(response: MockResponse) {
  return vi.fn().mockResolvedValue(response);
}

const successResponse: MockResponse = {
  ok: true,
  status: 200,
  json: async () => ({ accessToken: 'test-token-123' }),
};

const errorResponse: MockResponse = {
  ok: false,
  status: 401,
  json: async () => ({ detail: 'Refresh token expired' }),
};

beforeEach(() => {
  vi.stubEnv('NEXT_PUBLIC_BASE_URL', 'localhost:3000');
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe('TokenService', () => {
  describe('getAccessToken / setAccessToken / deleteAccessToken', () => {
    it('returns null initially', () => {
      const service = new TokenService();

      expect(service.getAccessToken()).toBeNull();
    });

    it('stores and returns access token', () => {
      const service = new TokenService();

      service.setAccessToken('my-token');

      expect(service.getAccessToken()).toBe('my-token');
    });

    it('deletes access token', () => {
      const service = new TokenService();

      service.setAccessToken('my-token');
      service.deleteAccessToken();

      expect(service.getAccessToken()).toBeNull();
    });
  });

  describe('loadTokens', () => {
    it('returns existing access token without fetch', async () => {
      const service = new TokenService();
      const fetch = vi.fn();

      service.setAccessToken('cached-token');

      const result = await service.loadTokens();

      expect(result).toBe('cached-token');
      expect(fetch).not.toHaveBeenCalled();
    });

    it('calls refreshTokens when access token is null', async () => {
      const service = new TokenService();
      const fetch = mockFetch(successResponse);
      vi.stubGlobal('fetch', fetch);

      const result = await service.loadTokens();

      expect(result).toBe('test-token-123');
      expect(service.getAccessToken()).toBe('test-token-123');
    });
  });

  describe('refreshTokens', () => {
    it('sends POST to /user/refresh with credentials include', async () => {
      const service = new TokenService();
      const fetch = mockFetch(successResponse);
      vi.stubGlobal('fetch', fetch);

      await service.refreshTokens();

      expect(fetch).toHaveBeenCalledOnce();
      const [url, init] = fetch.mock.calls[0];

      expect(url.toString()).toContain('/user/refresh');
      expect(init).toMatchObject({
        method: 'POST',
        credentials: 'include',
      });
    });

    it('stores and returns access token on success', async () => {
      const service = new TokenService();
      const fetch = mockFetch(successResponse);
      vi.stubGlobal('fetch', fetch);

      const result = await service.refreshTokens();

      expect(result).toBe('test-token-123');
      expect(service.getAccessToken()).toBe('test-token-123');
    });

    it('throws RefreshError on non-ok response and clears token', async () => {
      const service = new TokenService();
      service.setAccessToken('old-token');
      const fetch = mockFetch(errorResponse);
      vi.stubGlobal('fetch', fetch);

      await expect(service.refreshTokens()).rejects.toBeInstanceOf(RefreshError);
      await expect(service.refreshTokens()).rejects.toMatchObject({
        message: /Не могу обновить токены: Refresh token expired/u,
      });

      expect(service.getAccessToken()).toBeNull();
    });

    it('deduplicates concurrent refresh calls', async () => {
      const service = new TokenService();

      let callCount = 0;
      const fetch = vi.fn().mockImplementation(
        () =>
          new Promise<MockResponse>(resolve => {
            callCount++;
            resolve({
              ok: true,
              status: 200,
              json: async () => ({ accessToken: 'deduped-token' }),
            });
          }),
      );
      vi.stubGlobal('fetch', fetch);

      const [result1, result2] = await Promise.all([
        service.refreshTokens(),
        service.refreshTokens(),
      ]);

      expect(result1).toBe('deduped-token');
      expect(result2).toBe('deduped-token');
      expect(callCount).toBe(1);
    });

    it('allows a new refresh after a failed one', async () => {
      const service = new TokenService();
      const fetch = vi
        .fn()
        .mockResolvedValueOnce(errorResponse)
        .mockResolvedValueOnce(successResponse);
      vi.stubGlobal('fetch', fetch);

      await expect(service.refreshTokens()).rejects.toBeInstanceOf(RefreshError);

      expect(service.getAccessToken()).toBeNull();

      const second = await service.refreshTokens();

      expect(second).toBe('test-token-123');
      expect(fetch).toHaveBeenCalledTimes(2);
    });

    it('throws original error and clears promise on network failure', async () => {
      const service = new TokenService();
      const networkError = new Error('Network error');
      const fetch = vi.fn().mockRejectedValue(networkError);
      vi.stubGlobal('fetch', fetch);

      await expect(service.refreshTokens()).rejects.toThrow('Network error');

      expect(service.getAccessToken()).toBeNull();
    });
  });
});
