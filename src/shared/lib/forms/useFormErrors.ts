import { useCallback, useState } from 'react';
import { z } from 'zod';
import { validateForm, type ErrorMessages, type FormValues } from './validator';

export function useFormErrors<T extends z.ZodType>(schema: T) {
  const [formErrors, setFormErrors] = useState<ErrorMessages<T>>({});

  const validate = useCallback(
    (formValues: FormValues) => {
      const result = validateForm(schema, formValues);

      if (!result.ok) {
        setFormErrors(result.errors);
        return null;
      }

      return result.data;
    },
    [schema],
  );

  return {
    formErrors,
    validateForm: validate,
  };
}
