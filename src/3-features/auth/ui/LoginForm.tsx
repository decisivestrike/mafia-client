'use client';

import { Form, Toast } from '@base-ui/react';
import { useFormErrors } from '@shared/lib/forms/useFormErrors';
import { Button, Field } from '@shared/ui';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { login } from '../api/login';
import { placeholder } from '../model/placeholders';
import { loginSchema } from '../model/schemas/login-schema';

export default function LoginForm() {
  const router = useRouter();
  const toastManager = Toast.useToastManager();
  const { formErrors, validateForm } = useFormErrors(loginSchema);

  const onSubmit = useCallback(
    async (formValues: Form.Values) => {
      const data = validateForm(formValues);

      if (data === null) {
        return;
      }

      const { name, password } = data;
      const error = await login(name, password);

      if (error === null) {
        router.replace('/profile');
      } else {
        toastManager.add({
          title: 'Ошибка',
          description: error.detail,
        });
      }
    },
    [router, toastManager, validateForm],
  );

  return (
    <Form
      errors={formErrors}
      onFormSubmit={onSubmit}
      className="w-75 gap-4 flex flex-col"
    >
      <Field.Root name="name">
        <Field.Label>Имя</Field.Label>
        <Field.Control placeholder={placeholder.name} type="text" />
        <Field.Error />
      </Field.Root>
      <Field.Root name="password">
        <Field.Label>Пароль</Field.Label>
        <Field.Control placeholder={placeholder.password} type="password" />
        <Field.Error />
      </Field.Root>
      <Button type="submit">Войти</Button>
    </Form>
  );
}
