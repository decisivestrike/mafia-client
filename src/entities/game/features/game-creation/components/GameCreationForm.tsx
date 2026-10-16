'use client';

import { Form, Toast } from '@base-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import styles from './game-creation-form.module.css';
import { gameCreationOptions } from '@/entities/game/api/create-game';
import { getLobbiesOptions } from '@/entities/game/api/get-all';
import {
  createLobbySchema,
  maxPlayers,
  minPlayers,
} from '@/entities/game/model/create-lobby-schema';
import { useGameIdStore } from '@/entities/user/model/status-store/useUserStatusStore';
import { useFormErrors } from '@/shared/lib/forms/useFormErrors';
import { Button, Field } from '@/shared/ui';
import { Heading } from '@/shared/ui/Heading/Heading';
import { MainPageWrapper } from '@/shared/ui/MainPageWrapper/MainPageWrapper';

export function GameCreationForm() {
  const { formErrors, validateForm } = useFormErrors(createLobbySchema);
  const toastManager = Toast.useToastManager();
  const queryClient = useQueryClient();
  const setGameId = useGameIdStore(store => store.set);
  const router = useRouter();

  const { mutate: createLobby } = useMutation({
    ...gameCreationOptions,
    onSuccess: game => {
      void queryClient.invalidateQueries({
        queryKey: getLobbiesOptions.queryKey,
      });

      setGameId(game.id);

      router.replace(`/game/${game.id}`);
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
    <MainPageWrapper className={styles.Wrapper}>
      <Heading>Создать игру</Heading>
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
    </MainPageWrapper>
  );
}
