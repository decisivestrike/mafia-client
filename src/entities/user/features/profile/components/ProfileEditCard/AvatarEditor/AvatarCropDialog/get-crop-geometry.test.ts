import { describe, expect, it } from 'vitest';
import { getCropGeometry } from './get-crop-geometry';

const stageSize = 200;

describe('getCropGeometry', () => {
  it('при минимальном зуме берёт всё квадратное изображение', () => {
    const geometry = getCropGeometry({
      imageWidth: 1000,
      imageHeight: 1000,
      stageSize,
      zoom: 1,
      offsetX: 0,
      offsetY: 0,
    });

    expect(geometry.sourceSize).toBe(1000);
    expect(geometry.sourceX).toBe(0);
    expect(geometry.sourceY).toBe(0);
  });

  it('берёт центральный квадрат у горизонтального изображения', () => {
    const geometry = getCropGeometry({
      imageWidth: 2000,
      imageHeight: 1000,
      stageSize,
      zoom: 1,
      offsetX: 0,
      offsetY: 0,
    });

    expect(geometry.sourceSize).toBe(1000);
    expect(geometry.sourceX).toBe(500);
    expect(geometry.sourceY).toBe(0);
  });

  it('ограничивает смещение краями изображения', () => {
    const geometry = getCropGeometry({
      imageWidth: 2000,
      imageHeight: 1000,
      stageSize,
      zoom: 1,
      offsetX: 1000,
      offsetY: 1000,
    });

    expect(geometry.offsetX).toBe(100);
    expect(geometry.offsetY).toBe(0);
    expect(geometry.sourceX).toBe(0);
    expect(geometry.sourceY).toBe(0);
  });

  it('уменьшает область кропа при зуме', () => {
    const geometry = getCropGeometry({
      imageWidth: 2000,
      imageHeight: 1000,
      stageSize,
      zoom: 2,
      offsetX: 0,
      offsetY: 0,
    });

    expect(geometry.sourceSize).toBe(500);
    expect(geometry.sourceX).toBe(750);
  });

  it('возвращает пустую геометрию без размеров', () => {
    const geometry = getCropGeometry({
      imageWidth: 0,
      imageHeight: 1000,
      stageSize,
      zoom: 1,
      offsetX: 0,
      offsetY: 0,
    });

    expect(geometry.sourceSize).toBe(0);
  });
});
