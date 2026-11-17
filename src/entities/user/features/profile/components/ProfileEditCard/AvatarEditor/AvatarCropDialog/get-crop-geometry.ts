export const MIN_CROP_ZOOM = 1;
export const MAX_CROP_ZOOM = 3;

export interface CropGeometryInput {
  imageWidth: number;
  imageHeight: number;
  stageSize: number;
  zoom: number;
  offsetX: number;
  offsetY: number;
}

export interface CropGeometry {
  displayWidth: number;
  displayHeight: number;
  offsetX: number;
  offsetY: number;
  /** Координаты и размер области в пикселях исходного изображения */
  sourceX: number;
  sourceY: number;
  sourceSize: number;
}

const emptyGeometry: CropGeometry = {
  displayWidth: 0,
  displayHeight: 0,
  offsetX: 0,
  offsetY: 0,
  sourceX: 0,
  sourceY: 0,
  sourceSize: 0,
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Считает положение картинки в квадратной области кропа.
 * Картинка всегда покрывает область целиком, поэтому кроп не выходит за её края.
 */
export function getCropGeometry({
  imageWidth,
  imageHeight,
  stageSize,
  zoom,
  offsetX,
  offsetY,
}: CropGeometryInput): CropGeometry {
  if (imageWidth <= 0 || imageHeight <= 0 || stageSize <= 0) {
    return emptyGeometry;
  }

  const baseScale = Math.max(stageSize / imageWidth, stageSize / imageHeight);
  const scale = baseScale * zoom;

  const displayWidth = imageWidth * scale;
  const displayHeight = imageHeight * scale;

  const maxOffsetX = Math.max(0, (displayWidth - stageSize) / 2);
  const maxOffsetY = Math.max(0, (displayHeight - stageSize) / 2);

  const clampedOffsetX = clamp(offsetX, -maxOffsetX, maxOffsetX);
  const clampedOffsetY = clamp(offsetY, -maxOffsetY, maxOffsetY);

  const sourceSize = stageSize / scale;
  const sourceX = clamp(
    (displayWidth - stageSize) / (2 * scale) - clampedOffsetX / scale,
    0,
    imageWidth - sourceSize,
  );
  const sourceY = clamp(
    (displayHeight - stageSize) / (2 * scale) - clampedOffsetY / scale,
    0,
    imageHeight - sourceSize,
  );

  return {
    displayWidth,
    displayHeight,
    offsetX: clampedOffsetX,
    offsetY: clampedOffsetY,
    sourceX,
    sourceY,
    sourceSize,
  };
}
