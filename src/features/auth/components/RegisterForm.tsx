'use client';

import { Form, Toast } from '@base-ui/react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { register } from '../api/register';
import { placeholder } from '../model/placeholders';
import { registerSchema } from '../model/schemas/register-schema';
import styles from './form.module.css';
import { useFormErrors } from '@/shared/lib/forms/useFormErrors';
import { Button, Field } from '@/shared/ui';

export default function RegisterForm() {
  const { formErrors, validateForm } = useFormErrors(registerSchema);
  const toastManager = Toast.useToastManager();
  const router = useRouter();

  const onSubmit = useCallback(
    async (formValues: Form.Values) => {
      const data = validateForm(formValues);
      if (data === null) return;

      const { email, name, password } = data;
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
    [router, toastManager, validateForm],
  );

  return (
    <Form errors={formErrors} onFormSubmit={onSubmit} className={styles.Form}>
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
