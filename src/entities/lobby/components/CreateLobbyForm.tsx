'use client';

import { Form } from '@base-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { createLobby } from '../api/create-lobby';
import {
  createLobbySchema,
  maxPlayers,
  minPlayers,
} from '../schemas/create-lobby-schema';
import { type ErrorMessages, validateForm } from '@/features/auth/common/validator';
import { Button, Field } from '@/shared/components';

export function CreateLobbyForm() {
  const [formErrors, setFormErrors] = useState<
    ErrorMessages<typeof createLobbySchema>
  >({});
  const queryClient = useQueryClient();

  const onSubmit = useCallback(
    async (formValues: Form.Values) => {
      const result = validateForm(createLobbySchema, formValues);

      if (!result.ok) {
        setFormErrors(result.errors);
        return;
      }

      const { maxPlayers } = result.data;

      await createLobby(maxPlayers);
      await queryClient.invalidateQueries({ queryKey: ['lobbies'] });
    },
    [queryClient],
  );

  return (
    <Form
      errors={formErrors}
      onFormSubmit={onSubmit}
      className="flex w-75 flex-col gap-4"
    >
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
