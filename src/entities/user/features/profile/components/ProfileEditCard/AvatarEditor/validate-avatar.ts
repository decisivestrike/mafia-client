export const ALLOWED_AVATAR_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
] as const;

export const AVATAR_ACCEPT = ALLOWED_AVATAR_TYPES.join(',');

const allowedTypes = new Set<string>(ALLOWED_AVATAR_TYPES);

/** Возвращает текст ошибки или null, если файл подходит на аватар */
export function validateAvatarFile(file: File): string | null {
  if (!allowedTypes.has(file.type)) {
    return 'Поддерживаются только JPG, PNG и WebP';
  }

  return null;
}

export const MAX_AVATAR_SIZE = 5 * 1024 * 1024;

/** Проверяет размер уже обрезанного аватара перед загрузкой */
export function validateCroppedAvatar(blob: Blob): string | null {
  if (blob.size > MAX_AVATAR_SIZE) {
    return 'Файл больше 5 МБ';
  }

  return null;
}
