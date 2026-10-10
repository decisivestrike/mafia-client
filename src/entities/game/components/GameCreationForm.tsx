'use client';

import { Form, Toast } from '@base-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { gameCreationOptions } from '../api/create-lobby';
import { getLobbiesOptions } from '../api/get-lobbies';
import {
  createLobbySchema,
  maxPlayers,
  minPlayers,
} from '../model/create-lobby-schema';
import styles from './create-lobby-form.module.css';
import { useFormErrors } from '@/shared/lib/forms/useFormErrors';
import { Button, Field } from '@/shared/ui';

export function GameCreationForm() {
  const { formErrors, validateForm } = useFormErrors(createLobbySchema);
  const toastManager = Toast.useToastManager();
  const queryClient = useQueryClient();

  const { mutate: createLobby } = useMutation({
    ...gameCreationOptions,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: getLobbiesOptions.queryKey,
      });

      toastManager.add({
        data: 'Успех',
        description: 'Лобби создано',
      });
    },
    onError: error => {
      toastManager.add({
        data: 'Ошибка',
        description: error.message,
      });
    },
  });

  const onSubmit = useCallback(
    async (formValues: Form.Values) => {
      const data = validateForm(formValues);

      if (data !== null) {
        createLobby(data.maxPlayers);
      }
    },
    [createLobby, validateForm],
  );

  return (
    <Form errors={formErrors} onFormSubmit={onSubmit} className={styles.Form}>
      <Field.Root name="maxPlayers">
        <Field.Label>Максимум игроков</Field.Label>
        <Field.Control
          type="number"
          min={minPlayers}
          max={maxPlayers}
          defaultValue={10}
        />
        <Field.Error />
      </Field.Root>
      <Button type="submit">Создать</Button>
    </Form>
  );
}
