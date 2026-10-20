'use client';

import { Form, Toast } from '@base-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { SectionLabel } from '../SectionLabel';
import styles from './game-creation-form.module.css';
import { gameCreationOptions } from '@/entities/game/api/create-game';
import { getLobbiesOptions } from '@/entities/game/api/get-all';
import {
  createLobbySchema,
  maxPlayers,
  minPlayers,
} from '@/entities/game/model/create-lobby-schema';
import { useGameIdActions } from '@/entities/game/stores/game-id-store';
import { useFormErrors } from '@/shared/lib/forms/useFormErrors';
import { Button, Field } from '@/shared/ui';
import { Card } from '@/shared/ui/Card/Card';

export function GameCreationForm() {
  const { formErrors, validateForm } = useFormErrors(createLobbySchema);
  const toastManager = Toast.useToastManager();
  const queryClient = useQueryClient();
  const { setGameId } = useGameIdActions();
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
        title: 'Ошибка',
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
      <GameNameFormSection />
      <GameSettingsFormSection />
      <Button type="submit">Создать операцию</Button>
    </Form>
  );
}

function GameNameFormSection() {
  return (
    <Card className={styles.Card}>
      <SectionLabel>Название операции</SectionLabel>
    </Card>
  );
}

function GameSettingsFormSection() {
  return (
    <Card className={styles.Card}>
      <SectionLabel>Настройки игры</SectionLabel>
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
    </Card>
  );
}
