import { queryOptions } from '@tanstack/react-query';
import { fetchAuthorized, HttpError, parseApiError } from '@/shared/api';

const IMAGE_SIGNATURES: { type: string; bytes: number[] }[] = [
  { type: 'image/jpeg', bytes: [0xff, 0xd8, 0xff] },
  { type: 'image/png', bytes: [0x89, 0x50, 0x4e, 0x47] },
  { type: 'image/gif', bytes: [0x47, 0x49, 0x46] },
];

/**
 * Бэкенд всегда отдаёт image/jpeg, даже если внутри GIF или PNG.
 * Определяем реальный формат по сигнатуре, чтобы GIF анимировался.
 */
async function normalizeImageBlob(blob: Blob): Promise<Blob> {
  const header = new Uint8Array(await blob.slice(0, 12).arrayBuffer());

  const detectedType = IMAGE_SIGNATURES.find(({ bytes }) =>
    bytes.every((byte, index) => header[index] === byte),
  )?.type;

  if (detectedType === undefined || detectedType === blob.type) {
    return blob;
  }

  return new Blob([blob], { type: detectedType });
}

export async function getAvatar(): Promise<Blob | null> {
  const response = await fetchAuthorized('/user/avatar');

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    const error = await parseApiError(response);

    throw new HttpError(response.status, error.detail);
  }

  return normalizeImageBlob(await response.blob());
}

export const avatarOptions = queryOptions({
  queryKey: ['profile', 'avatar'],
  queryFn: getAvatar,
  staleTime: Infinity,
  retry: false,
});
