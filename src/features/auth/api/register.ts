import { tokenService } from '@/shared/api/token-service';
import { fetchApi } from '@/shared/api/utils';

import type { AccessTokenResponse, ApiError } from '@/shared/api';

export async function register(
  email: string,
  name: string,
  password: string,
): Promise<ApiError | null> {
  const response = await fetchApi('/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, username: name, password }),
    credentials: 'include',
  });

  const body = await response.json();

  if (response.ok) {
    const tokens = body as AccessTokenResponse;
    tokenService.setAccessToken(tokens.accessToken);

    return null;
  }

  return body as ApiError;
}
