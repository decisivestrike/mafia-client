import { url } from '@/shared/api';
import { setAccessToken } from '@/shared/api/refresh';

import type { ApiError, JwtTokens } from '@/shared/api';

export async function login(
  name: string,
  password: string,
): Promise<ApiError | null> {
  const formData = new FormData();
  formData.append('username', name);
  formData.append('password', password);

  const response = await fetch(url('/user/login'), {
    method: 'POST',
    body: formData,
  });

  const body = await response.json();

  if (response.ok) {
    const tokens = body as JwtTokens;
    setAccessToken(tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);

    return null;
  }

  return body as ApiError;
}
