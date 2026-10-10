import type { ApiError } from './error';

export function createRequest<T = unknown>() {
  return <Args extends unknown[]>(f: (...args: Args) => Promise<Response>) =>
    async (...args: Args): Promise<T> => {
      const response = await f(...args);
      const body = await response.json();

      if (!response.ok) {
        throw new Error((body as ApiError).detail);
      }

      return body as T;
    };
}
