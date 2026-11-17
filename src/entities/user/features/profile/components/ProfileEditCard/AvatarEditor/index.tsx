'use client';

import { Toast } from '@base-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Camera, HatGlasses } from 'lucide-react';
import { useCallback, useRef, useState, type ChangeEvent } from 'react';
import styles from './avatar-editor.module.css';
import { AvatarCropDialog } from './AvatarCropDialog';
import { AVATAR_ACCEPT, validateAvatarFile } from './validate-avatar';
import { avatarOptions } from '@/entities/user/api/get-avatar';
import { setAvatarOptions } from '@/entities/user/api/set-avatar';
import { useObjectUrl } from '@/shared/lib';
import { Spinner } from '@/shared/ui';
import { Avatar } from '@/shared/ui/Avatar';

export function AvatarEditor() {
  const queryClient = useQueryClient();
  const toastManager = Toast.useToastManager();
  const inputRef = useRef<HTMLInputElement>(null);

  const [pendingFile, setPendingFile] = useState<File | null>(null);

  const { data: avatar } = useQuery(avatarOptions);
  const avatarUrl = useObjectUrl(avatar);

  const { mutate: uploadAvatar, isPending: isUploading } = useMutation({
    ...setAvatarOptions,
    onSuccess: uploadedAvatar => {
      queryClient.setQueryData(avatarOptions.queryKey, uploadedAvatar);
      setPendingFile(null);

      toastManager.add({
        id: 'avatar-uploaded',
        timeout: 4000,
        title: 'Аватар обновлён',
        description: 'Теперь вы выглядите ещё подозрительнее',
      });
    },
    onError: error => {
      toastManager.add({
        id: 'avatar-upload-error',
        timeout: 4000,
        title: 'Не удалось загрузить аватар',
        description: error.message,
      });
    },
  });

  const openFilePicker = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const closeCropDialog = useCallback(() => {
    setPendingFile(null);
  }, []);

  const confirmCrop = useCallback(
    (croppedAvatar: Blob) => {
      uploadAvatar(croppedAvatar);
    },
    [uploadAvatar],
  );

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      event.target.value = '';

      if (file === undefined) return;

      const validationError = validateAvatarFile(file);

      if (validationError !== null) {
        toastManager.add({
          id: 'avatar-invalid-file',
          timeout: 4000,
          title: 'Неподходящий файл',
          description: validationError,
        });

        return;
      }

      setPendingFile(file);
    },
    [toastManager],
  );

  const cropKey =
    pendingFile === null
      ? 'empty'
      : `${pendingFile.name}:${pendingFile.size}:${pendingFile.lastModified}`;

  return (
    <div className={styles.Root}>
      <button
        type="button"
        className={styles.Trigger}
        onClick={openFilePicker}
        disabled={isUploading}
        aria-label="Изменить аватар"
        aria-busy={isUploading}
      >
        <Avatar.Root className={styles.Avatar}>
          <Avatar.Image
            src={avatarUrl}
            alt="Аватар"
            width="160"
            height="160"
            className={styles.Image}
          />
          <Avatar.Fallback>
            <HatGlasses size={72} color="lightgray" />
          </Avatar.Fallback>
        </Avatar.Root>

        <span className={styles.Overlay}>
          {isUploading ? (
            <Spinner className={styles.Spinner} />
          ) : (
            <Camera size={28} className={styles.OverlayIcon} />
          )}
        </span>
      </button>

      <input
        ref={inputRef}
        className={styles.Input}
        type="file"
        accept={AVATAR_ACCEPT}
        onChange={handleFileChange}
        tabIndex={-1}
      />

      <AvatarCropDialog
        key={cropKey}
        file={pendingFile}
        isUploading={isUploading}
        onCancel={closeCropDialog}
        onConfirm={confirmCrop}
      />
    </div>
  );
}
