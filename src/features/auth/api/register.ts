import { url } from '@/shared/api';
import { setAccessToken } from '@/shared/api/refresh';

import type { JwtTokens, ApiError } from '@/shared/api';

export interface UserData extends JwtTokens {
  status: string;
  message: string;
}

export async function register(
  email: string,
  name: string,
  password: string,
): Promise<ApiError | null> {
  const response = await fetch(url('/user/register'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, username: name, password }),
  });

  const body = await response.json();

  if (response.ok) {
    const tokens = body as UserData;
    setAccessToken(tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);

    return null;
  }

  return body as ApiError;
}
