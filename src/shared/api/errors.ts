export interface ApiError {
  detail: string;
}

export class HttpError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

/** Разбирает тело ошибки API, если оно не JSON — возвращает запасное сообщение */
export async function parseApiError(response: Response): Promise<ApiError> {
  try {
    const body = (await response.json()) as ApiError;

    if (typeof body.detail === 'string' && body.detail.length > 0) {
      return body;
    }
  } catch {
    // Ответ не JSON — используем запасное сообщение
  }

  return { detail: `Ошибка запроса: ${response.status}` };
}
