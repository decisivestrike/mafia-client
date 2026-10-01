'use client';

import { Form } from '@base-ui/react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { register } from '../api/register';
import { placeholder } from '../common/placeholders';
import { type ErrorMessages, validateForm } from '../common/validator';
import { registerSchema } from '../schemas/register-schema';
import { Button, Field } from '@/shared/components';

export default function RegisterForm() {
  const [formErrors, setFormErrors] = useState<ErrorMessages<typeof registerSchema>>(
    {},
  );
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
