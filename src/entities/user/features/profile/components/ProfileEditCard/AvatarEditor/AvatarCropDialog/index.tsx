'use client';

import { Dialog, Toast } from '@base-ui/react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { validateCroppedAvatar } from '../validate-cropped-avatar';
import styles from './avatar-crop-dialog.module.css';
import { cropImageToSquare } from './crop-image';
import { getCropGeometry, MAX_CROP_ZOOM, MIN_CROP_ZOOM } from './get-crop-geometry';
import { useObjectUrl } from '@/shared/lib';
import { cn } from '@/shared/lib/utils';
import { Button, Spinner } from '@/shared/ui';

import type {
  CSSProperties,
  ChangeEvent,
  PointerEvent,
  SyntheticEvent,
} from 'react';

type ImageSize = {
  width: number;
  height: number;
};

type Offset = {
  x: number;
  y: number;
};

type DragState = {
  pointerId: number;
  startX: number;
  startY: number;
  offsetX: number;
  offsetY: number;
};

type AvatarCropDialogProps = {
  file: File | null;
  isUploading: boolean;
  onCancel: () => void;
  onConfirm: (avatar: Blob) => void;
};

export function AvatarCropDialog({
  file,
  isUploading,
  onCancel,
  onConfirm,
}: AvatarCropDialogProps) {
  const toastManager = Toast.useToastManager();
  const imageUrl = useObjectUrl(file);
  const imageRef = useRef<HTMLImageElement>(null);
  const dragState = useRef<DragState | null>(null);

  const [zoom, setZoom] = useState(MIN_CROP_ZOOM);
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState<ImageSize | null>(null);
  const [isCropping, setIsCropping] = useState(false);

  const isOpen = file !== null;
  const isBusy = isUploading || isCropping;
  const { ref: stageRef, width: stageSize } = useElementWidth<HTMLDivElement>();

  const geometry = useMemo(() => {
    if (imageSize === null || stageSize === 0) {
      return null;
    }

    return getCropGeometry({
      imageWidth: imageSize.width,
      imageHeight: imageSize.height,
      stageSize,
      zoom,
      offsetX: offset.x,
      offsetY: offset.y,
    });
  }, [imageSize, offset, stageSize, zoom]);

  const imageStyle = useMemo<CSSProperties | undefined>(() => {
    if (geometry === null) {
      return undefined;
    }

    return {
      width: geometry.displayWidth,
      height: geometry.displayHeight,
      transform: `translate(-50%, -50%) translate(${geometry.offsetX}px, ${geometry.offsetY}px)`,
    };
  }, [geometry]);

  const cancelButton = useMemo(() => <Button variant="secondary" />, []);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (open || isBusy) {
        return;
      }

      onCancel();
    },
    [isBusy, onCancel],
  );

  const handleImageLoad = useCallback((event: SyntheticEvent<HTMLImageElement>) => {
    const image = event.currentTarget;

    setImageSize({
      width: image.naturalWidth,
      height: image.naturalHeight,
    });
  }, []);

  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (geometry === null || isBusy) {
        return;
      }

      dragState.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        offsetX: geometry.offsetX,
        offsetY: geometry.offsetY,
      };

      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [geometry, isBusy],
  );

  const handlePointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const drag = dragState.current;

    if (drag === null || drag.pointerId !== event.pointerId) {
      return;
    }

    setOffset({
      x: drag.offsetX + event.clientX - drag.startX,
      y: drag.offsetY + event.clientY - drag.startY,
    });
  }, []);

  const handlePointerUp = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const drag = dragState.current;

    if (drag === null || drag.pointerId !== event.pointerId) {
      return;
    }

    dragState.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }, []);

  const handleZoomChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setZoom(Number(event.currentTarget.value));
  }, []);

  const handleSave = useCallback(async () => {
    const image = imageRef.current;

    if (image === null || geometry === null) {
      return;
    }

    setIsCropping(true);

    try {
      const croppedAvatar = await cropImageToSquare(image, geometry);
      const validationError = validateCroppedAvatar(croppedAvatar);

      if (validationError !== null) {
        toastManager.add({
          id: 'avatar-too-large',
          timeout: 4000,
          title: 'Слишком большой файл',
          description: validationError,
        });

        return;
      }

      onConfirm(croppedAvatar);
    } catch (error) {
      toastManager.add({
        id: 'avatar-crop-error',
        timeout: 4000,
        title: 'Не удалось обрезать изображение',
        description:
          error instanceof Error ? error.message : 'Попробуйте другое изображение',
      });
    } finally {
      setIsCropping(false);
    }
  }, [geometry, onConfirm, toastManager]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className={styles.Backdrop} />
        <Dialog.Viewport className={styles.Viewport}>
          <Dialog.Popup className={styles.Popup}>
            <Dialog.Title className={styles.Title}>Область аватара</Dialog.Title>
            <Dialog.Description className={styles.Description}>
              Перетащите изображение и настройте масштаб. В аватар попадёт только
              область внутри рамки.
            </Dialog.Description>

            <div
              ref={stageRef}
              className={styles.Stage}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              {imageUrl !== null && (
                // oxlint-disable-next-line next/no-img-element
                <img
                  ref={imageRef}
                  src={imageUrl}
                  alt="Выбранное изображение"
                  className={cn(
                    styles.Image,
                    geometry !== null ? styles.ImageReady : undefined,
                  )}
                  style={imageStyle}
                  draggable={false}
                  onLoad={handleImageLoad}
                />
              )}
              {geometry === null && (
                <div className={styles.Loading}>
                  <Spinner />
                </div>
              )}
            </div>

            <label className={styles.Zoom}>
              <span className={styles.ZoomLabel}>Масштаб</span>
              <input
                className={styles.ZoomInput}
                type="range"
                min={MIN_CROP_ZOOM}
                max={MAX_CROP_ZOOM}
                step={0.01}
                value={zoom}
                onChange={handleZoomChange}
                disabled={isBusy}
              />
            </label>

            <div className={styles.Actions}>
              <Dialog.Close render={cancelButton} disabled={isBusy}>
                Отмена
              </Dialog.Close>
              <Button onClick={handleSave} disabled={geometry === null || isBusy}>
                {isBusy ? 'Сохранение…' : 'Сохранить'}
              </Button>
            </div>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function useElementWidth<Element extends HTMLElement>() {
  const [width, setWidth] = useState(0);
  const observerRef = useRef<ResizeObserver | null>(null);

  const ref = useCallback((element: Element | null) => {
    observerRef.current?.disconnect();
    observerRef.current = null;

    if (element === null) {
      return;
    }

    const observer = new ResizeObserver(entries => {
      const entry = entries[0];

      if (entry !== undefined) {
        setWidth(entry.contentRect.width);
      }
    });

    observer.observe(element);
    observerRef.current = observer;
  }, []);

  return { ref, width };
}
