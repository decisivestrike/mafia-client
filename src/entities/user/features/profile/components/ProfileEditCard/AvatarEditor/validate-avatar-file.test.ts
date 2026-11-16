import { describe, expect, it } from 'vitest';
import { validateAvatarFile } from './validate-avatar-file';

function createFile(type: string) {
  return new File(['avatar'], 'avatar', { type });
}

describe('validateAvatarFile', () => {
  it.each(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])(
    'пропускает %s',
    type => {
      expect(validateAvatarFile(createFile(type))).toBeNull();
    },
  );

  it.each(['image/svg+xml', 'application/pdf', 'text/plain'])(
    'отклоняет %s',
    type => {
      expect(validateAvatarFile(createFile(type))).not.toBeNull();
    },
  );
});
