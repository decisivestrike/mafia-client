type SameSite = 'Strict' | 'Lax' | 'None';

interface CookieOptions {
  path?: string;
  domain?: string;
  maxAge?: number; // в секундах
  expires?: Date;
  secure?: boolean;
  sameSite?: SameSite;
}

/**
 * Устанавливает cookie.
 */
export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {},
): void {
  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (options.maxAge !== undefined) {
    cookie += `; Max-Age=${options.maxAge}`;
  }

  if (options.expires) {
    cookie += `; Expires=${options.expires.toUTCString()}`;
  }

  if (options.path) {
    cookie += `; Path=${options.path}`;
  }

  if (options.domain) {
    cookie += `; Domain=${options.domain}`;
  }

  if (options.secure) {
    cookie += `; Secure`;
  }

  if (options.sameSite) {
    cookie += `; SameSite=${options.sameSite}`;
  }

  document.cookie = cookie;
}

/**
 * Получает значение cookie по имени.
 * Возвращает null, если cookie не найдена.
 */
export function getCookie(name: string): string | null {
  const cookies = document.cookie ? document.cookie.split('; ') : [];

  for (const cookie of cookies) {
    const [key, ...rest] = cookie.split('=');

    if (decodeURIComponent(key) === name) {
      return decodeURIComponent(rest.join('='));
    }
  }

  return null;
}

/**
 * Удаляет cookie.
 * Важно: path и domain должны совпадать с теми, что использовались при установке.
 */
export function deleteCookie(
  name: string,
  options: Pick<CookieOptions, 'path' | 'domain' | 'secure' | 'sameSite'> = {},
): void {
  setCookie(name, '', {
    ...options,
    maxAge: 0,
  });
}
