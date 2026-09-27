import { url } from '@/shared/api';

import type { JwtTokens, ApiError } from '@/shared/api';

export interface UserData extends JwtTokens {
  status: string;
  message: string;
}

export type RegisterResult =
  | { ok: true; body: UserData }
  | { ok: false; body: ApiError };

export async function register(
  email: string,
  name: string,
  password: string,
): Promise<RegisterResult> {
  const response = await fetch(url('/user/register'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, username: name, password }),
  });

  const body = await response.json();

  return { ok: response.ok, body };
}
