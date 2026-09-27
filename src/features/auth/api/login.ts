import { url } from '@/shared/api';

import type { ApiError, JwtTokens } from '@/shared/api';

export type LoginResult =
  | { ok: true; body: JwtTokens }
  | { ok: false; body: ApiError };

export async function login(name: string, password: string): Promise<LoginResult> {
  const formData = new FormData();
  formData.append('username', name);
  formData.append('password', password);

  const response = await fetch(url('/user/login'), {
    method: 'POST',
    body: formData,
  });

  const body = await response.json();

  return { ok: response.ok, body };
}
