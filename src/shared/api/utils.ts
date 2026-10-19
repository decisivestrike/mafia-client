import { HttpError, type ApiError } from './errors';
import { tokenService } from './token-service';
import { fetchApi } from './wrappers';

export function createRequest<T = unknown>() {
  return <Args extends unknown[]>(f: (...args: Args) => Promise<Response>) =>
    async (...args: Args): Promise<T> => {
      const response = await f(...args);
      const body = await response.json();

      if (!response.ok) {
        throw new HttpError(response.status, (body as ApiError).detail);
      }

      return body as T;
    };
}

/** fetch для эндпоинтов, требующих авторизацию */
export async function fetchAuthorized(
  endpoint: string,
  init: RequestInit = {},
): Promise<Response> {
  let accessToken = tokenService.getAccessToken();

  // Есть мы сделали рефреш, но все равно 401, то повторный рефреш не делаем
  let refreshed = false;

  if (accessToken === null) {
    accessToken = await tokenService.refreshTokens();
    refreshed = true;
  }

  let response = await fetchWithBearer(endpoint, accessToken, init);

  if (response.status === 401 && !refreshed) {
    accessToken = await tokenService.refreshTokens();
    response = await fetchWithBearer(endpoint, accessToken, init);
  }

  return response;
}

/** Добавляет/перезаписывает заголовок Authorization */
function fetchWithBearer(endpoint: string, token: string, init: RequestInit = {}) {
  const { headers, ...rest } = init;

  const headersWithBearer = new Headers(headers);
  headersWithBearer.set('Authorization', `Bearer ${token}`);

  return fetchApi(endpoint, {
    ...rest,
    headers: headersWithBearer,
  });
}
