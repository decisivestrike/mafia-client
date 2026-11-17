import { mutationOptions } from '@tanstack/react-query';
import { fetchAuthorized, HttpError, parseApiError } from '@/shared/api';

export async function setAvatar(avatar: Blob): Promise<Blob> {
  const formData = new FormData();
  formData.append('file', avatar, 'avatar.png');

  const response = await fetchAuthorized('/user/avatar', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await parseApiError(response);

    throw new HttpError(response.status, error.detail);
  }

  const blob = await response.blob();

  if (blob.type === avatar.type) {
    return blob;
  }

  return new Blob([blob], { type: avatar.type });
}

export const setAvatarOptions = mutationOptions({
  mutationKey: ['profile', 'avatar'],
  mutationFn: setAvatar,
});
