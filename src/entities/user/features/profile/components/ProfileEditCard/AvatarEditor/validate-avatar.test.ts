import { describe, expect, it } from 'vitest';
import {
  validateAvatarFile,
  MAX_AVATAR_SIZE,
  validateCroppedAvatar,
} from './validate-avatar';

function createFile(type: string, size = 1) {
  return new File([new Uint8Array(size)], 'avatar', { type });
}

describe('validateAvatarFile', () => {
  it.each(['image/jpeg', 'image/png', 'image/webp'])('пропускает %s', type => {
    expect(validateAvatarFile(createFile(type))).toBeNull();
  });

  it.each(['image/gif', 'image/svg+xml', 'application/pdf', 'text/plain'])(
    'отклоняет %s',
    type => {
      expect(validateAvatarFile(createFile(type))).not.toBeNull();
    },
  );

  it('не ограничивает размер исходного файла', () => {
    const file = createFile('image/jpeg', MAX_AVATAR_SIZE + 1);

    expect(validateAvatarFile(file)).toBeNull();
  });
});

describe('validateCroppedAvatar', () => {
  it('пропускает результат ровно 5 МБ', () => {
    const blob = createFile('image/png', MAX_AVATAR_SIZE);

    expect(validateCroppedAvatar(blob)).toBeNull();
  });

  it('отклоняет результат больше 5 МБ', () => {
    const blob = createFile('image/png', MAX_AVATAR_SIZE + 1);

    expect(validateCroppedAvatar(blob)).toBe('Файл больше 5 МБ');
  });
});
