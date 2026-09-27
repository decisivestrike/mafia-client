import { getAccessToken, refreshTokens } from './refresh';

/** fetch для эндпоинтов, требующих авторизацию */
export async function fetchAuthorized(
  input: string | URL | Request,
  init: RequestInit = {},
): Promise<Response> {
  let accessToken = getAccessToken();

  // Есть мы сделали рефреш, но все равно 401, то повторный рефреш не делаем
  let refreshed = false;

  if (accessToken === null) {
    accessToken = await refreshTokens();
    refreshed = true;
  }

  let response = await fetchWithBearer(input, accessToken, init);

  if (response.status === 401 && !refreshed) {
    accessToken = await refreshTokens();
    response = await fetchWithBearer(input, accessToken, init);
  }

  return response;
}

/** Добавляет/перезаписывает заголовок Authorization */
function fetchWithBearer(
  input: string | URL | Request,
  token: string,
  init: RequestInit = {},
) {
  const { headers, ...rest } = init;

  const headersWithBearer = new Headers(headers);
  headersWithBearer.set('Authorization', `Bearer ${token}`);

  return fetch(input, {
    ...rest,
    headers: headersWithBearer,
  });
}
