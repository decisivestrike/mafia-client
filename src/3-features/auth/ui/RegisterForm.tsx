'use client';

import { Form, Toast } from '@base-ui/react';
import { Button, Field } from '@shared/components';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import {
  type ErrorMessages,
  validateForm,
} from '../../../5-shared/lib/forms/validator';
import { register } from '../api/register';
import { placeholder } from '../model/placeholders';
import { registerSchema } from '../model/schemas/register-schema';

export default function RegisterForm() {
  const [formErrors, setFormErrors] = useState<ErrorMessages<typeof registerSchema>>(
    {},
  );
  const toastManager = Toast.useToastManager();
  const router = useRouter();

  const onSubmit = useCallback(
    async (formValues: Form.Values) => {
      const result = validateForm(registerSchema, formValues);

      if (!result.ok) {
        setFormErrors(result.errors);
        return;
      }

      const { email, name, password } = result.data;
      const error = await register(email, name, password);

      if (error === null) {
        router.replace('/profile');
      } else {
        toastManager.add({
          title: 'Ошибка',
          description: error.detail,
        });
      }
    },
    [router, toastManager],
  );

  return (
    <Form
      errors={formErrors}
      onFormSubmit={onSubmit}
      className="w-75 gap-4 flex flex-col"
    >
      <Field.Root name="email">
        <Field.Label>Почта</Field.Label>
        <Field.Control placeholder={placeholder.email} />
        <Field.Error />
      </Field.Root>
      <Field.Root name="name">
        <Field.Label>Имя</Field.Label>
        <Field.Control placeholder={placeholder.name} />
        <Field.Error />
      </Field.Root>
      <Field.Root name="password">
        <Field.Label>Пароль</Field.Label>
        <Field.Control placeholder={placeholder.password} type="password" />
        <Field.Error />
      </Field.Root>
      <Field.Root name="passwordRepeat">
        <Field.Label>Повтор пароля</Field.Label>
        <Field.Control placeholder={placeholder.password} type="password" />
        <Field.Error />
      </Field.Root>
      <Button type="submit">Зарегистрироваться</Button>
    </Form>
  );
}
