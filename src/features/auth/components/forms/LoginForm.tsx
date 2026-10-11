'use client';

import { Form } from '@base-ui/react';
import { login } from '../../api/login';
import { useAuthSubmit } from '../../hooks/useAuthSubmit';
import { placeholder } from '../../model/placeholders';
import { loginSchema } from '../../model/schemas/login-schema';
import styles from './form.module.css';
import { Button, Field } from '@/shared/ui';

export function LoginForm() {
  const { formErrors, onSubmit, isPending } = useAuthSubmit(loginSchema, login);

  return (
    <Form errors={formErrors} onFormSubmit={onSubmit} className={styles.Form}>
      <Field.Root name="name">
        <Field.Label>Имя</Field.Label>
        <Field.Control
          placeholder={placeholder.name}
          type="text"
          autoComplete="username"
        />
        <Field.Error />
      </Field.Root>
      <Field.Root name="password">
        <Field.Label>Пароль</Field.Label>
        <Field.Control
          placeholder={placeholder.password}
          type="password"
          autoComplete="current-password"
        />
        <Field.Error />
      </Field.Root>
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Вход' : 'Войти'}
      </Button>
    </Form>
  );
}
