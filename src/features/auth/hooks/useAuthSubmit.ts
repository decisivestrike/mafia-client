import { Form, Toast } from '@base-ui/react';
import { useRouter } from 'next/navigation';
import { useCallback, useTransition } from 'react';
import { z } from 'zod';
import { useFormErrors } from '@/shared/lib/forms/useFormErrors';

import type { ApiError } from '@/shared/api';
import type { Route } from 'next';

export function useAuthSubmit<T extends z.ZodType>(
  schema: T,
  apiFn: (data: z.infer<T>) => Promise<ApiError | null>,
  redirectTo: Route = '/profile',
) {
  const { formErrors, validateForm } = useFormErrors(schema);
  const [isPending, startTransition] = useTransition();
  const toastManager = Toast.useToastManager();
  const router = useRouter();

  const onSubmit = useCallback(
    async (formValues: Form.Values) => {
      startTransition(async () => {
        const data = validateForm(formValues);
        if (data === null) return;

        let error: ApiError | null;
        try {
          error = await apiFn(data);
        } catch {
          toastManager.add({
            id: 'network-error',
            timeout: 4000,
            title: 'Нет ответа',
            description: 'Проверьте соединение и попробуйте снова',
          });
          return;
        }

        if (error === null) {
          router.replace(redirectTo);
        } else {
          toastManager.add({
            id: 'auth-error',
            timeout: 4000,
            title: 'Сервер прислал ошибку',
            description: error.detail,
          });
        }
      });
    },
    [validateForm, apiFn, redirectTo, router, toastManager],
  );

  return { formErrors, onSubmit, isPending };
}
