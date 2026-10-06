import { tokenService } from '@/shared/api/token-service';
import { fetchApi } from '@/shared/api/utils';

import type { AccessTokenResponse, ApiError } from '@/shared/api';

export async function login(
  name: string,
  password: string,
): Promise<ApiError | null> {
  const formData = new FormData();
  formData.append('username', name);
  formData.append('password', password);

  const response = await fetchApi('/user/login', {
    method: 'POST',
    body: formData,
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
