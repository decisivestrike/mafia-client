'use client';

import { Form } from '@base-ui/react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { login } from '../api/login';
import { placeholder } from '../common/placeholders';
import { type ErrorMessages, validateForm } from '../common/validator';
import { loginSchema } from '../schemas/login-schema';
import { Button, Field } from '@/shared/components';

export default function LoginForm() {
  const [formErrors, setFormErrors] = useState<ErrorMessages<typeof loginSchema>>(
    {},
  );
  const router = useRouter();

  const onSubmit = useCallback(
    async (formValues: Form.Values) => {
      const result = validateForm(loginSchema, formValues);

      if (!result.ok) {
        setFormErrors(result.errors);
        return;
      }

      const { name, password } = result.data;
      const error = await login(name, password);

      if (error === null) {
        router.replace('/profile');
      } else {
        console.error(error.details);
      }
    },
    [router],
  );

  return (
    <Form
      errors={formErrors}
      onFormSubmit={onSubmit}
      className="flex w-75 flex-col gap-4"
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
