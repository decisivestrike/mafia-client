import type { ApiError } from './error';

export class HttpError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

export function createRequest<T = unknown>() {
  return <Args extends unknown[]>(f: (...args: Args) => Promise<Response>) =>
    async (...args: Args): Promise<T> => {
      const response = await f(...args);
      const body = await response.json();

      if (!response.ok) {
        throw new HttpError(response.status, (body as ApiError).detail);
      }

      return body as T;
    };
}
