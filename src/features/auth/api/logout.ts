import { tokenService, type ApiError } from '@/shared/api';
import { fetchApi } from '@/shared/api';

export async function logout(): Promise<ApiError | null> {
  const response = await fetchApi('/user/logout', {
    method: 'POST',
    credentials: 'include',
  });

  if (response.ok) {
    tokenService.deleteAccessToken();
    return null;
  }

  return (await response.json()) as ApiError;
}
