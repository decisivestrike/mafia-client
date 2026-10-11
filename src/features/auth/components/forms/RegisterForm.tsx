'use client';

import { Form } from '@base-ui/react';
import { register } from '../../api/register';
import { useAuthSubmit } from '../../hooks/useAuthSubmit';
import { placeholder } from '../../model/placeholders';
import { registerSchema } from '../../model/schemas/register-schema';
import styles from './form.module.css';
import { Button, Field } from '@/shared/ui';

export function RegisterForm() {
  const { formErrors, onSubmit, isPending } = useAuthSubmit(
    registerSchema,
    register,
  );

  return (
    <Form errors={formErrors} onFormSubmit={onSubmit} className={styles.Form}>
      <Field.Root name="email">
        <Field.Label>Почта</Field.Label>
        <Field.Control placeholder={placeholder.email} autoComplete="email" />
        <Field.Error />
      </Field.Root>
      <Field.Root name="name">
        <Field.Label>Имя</Field.Label>
        <Field.Control placeholder={placeholder.name} autoComplete="username" />
        <Field.Error />
      </Field.Root>
      <Field.Root name="password">
        <Field.Label>Пароль</Field.Label>
        <Field.Control
          placeholder={placeholder.password}
          type="password"
          autoComplete="new-password"
        />
        <Field.Error />
      </Field.Root>
      <Field.Root name="passwordRepeat">
        <Field.Label>Повтор пароля</Field.Label>
        <Field.Control
          placeholder={placeholder.password}
          type="password"
          autoComplete="new-password"
        />
        <Field.Error />
      </Field.Root>
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Регистрация' : 'Зарегистрироваться'}
      </Button>
    </Form>
  );
}
