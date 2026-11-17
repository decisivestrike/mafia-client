export const MAX_AVATAR_SIZE = 5 * 1024 * 1024;

/** Проверяет размер уже обрезанного аватара перед загрузкой */
export function validateCroppedAvatar(blob: Blob): string | null {
  if (blob.size > MAX_AVATAR_SIZE) {
    return 'Файл больше 5 МБ';
  }

  return null;
}
