import { tokenService } from './token-service';
import { fetchApi } from './utils';

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
