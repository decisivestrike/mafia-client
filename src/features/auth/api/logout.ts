import { tokenService } from '@/shared/api';
import { fetchApi } from '@/shared/api/utils';

export async function logout() {
  const response = await fetchApi('/user/logout', {
    method: 'POST',
    credentials: 'include',
  });

  if (response.ok) {
    tokenService.deleteAccessToken();
    return true;
  }

  return false;
}
