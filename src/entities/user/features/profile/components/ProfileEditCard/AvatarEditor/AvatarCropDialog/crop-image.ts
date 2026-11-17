import type { CropGeometry } from './get-crop-geometry';

export const CROPPED_AVATAR_SIZE = 512;

/** Вырезает выбранную область и возвращает PNG без заливки фона */
export function cropImageToSquare(
  image: HTMLImageElement,
  geometry: CropGeometry,
): Promise<Blob> {
  const canvas = document.createElement('canvas');
  canvas.width = CROPPED_AVATAR_SIZE;
  canvas.height = CROPPED_AVATAR_SIZE;

  const context = canvas.getContext('2d');

  if (context === null) {
    return Promise.reject(new Error('Не удалось подготовить изображение'));
  }

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = 'high';
  context.drawImage(
    image,
    geometry.sourceX,
    geometry.sourceY,
    geometry.sourceSize,
    geometry.sourceSize,
    0,
    0,
    CROPPED_AVATAR_SIZE,
    CROPPED_AVATAR_SIZE,
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (blob === null) {
        reject(new Error('Не удалось обрезать изображение'));

        return;
      }

      resolve(blob);
    }, 'image/png');
  });
}
