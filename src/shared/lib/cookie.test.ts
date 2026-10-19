import { describe, it, expect, beforeEach } from 'vitest';
import { setCookie, getCookie, deleteCookie } from './cookie';

/**
 * Хранилище для мока document.cookie.
 * Каждый тест начинается с чистого состояния.
 */
let cookieStore = '';

beforeEach(() => {
  cookieStore = '';

  Object.defineProperty(document, 'cookie', {
    get: () => cookieStore,
    set: (value: string) => {
      // Перезаписываем всю строку (simplified mock, так как jsdom
      // не поддерживает real cookie jar).
      cookieStore = value;
    },
    configurable: true,
  });
});

describe('setCookie', () => {
  it('sets a cookie with name and value', () => {
    setCookie('theme', 'dark');
    expect(document.cookie).toBe('theme=dark');
  });

  it('encodes special characters in name and value', () => {
    setCookie('user name', 'hello world');
    expect(document.cookie).toBe(
      `${encodeURIComponent('user name')}=${encodeURIComponent('hello world')}`,
    );
  });

  it('sets Max-Age when provided', () => {
    setCookie('session', 'abc', { maxAge: 3600 });
    expect(document.cookie).toContain('Max-Age=3600');
  });

  it('sets Expires in UTC format', () => {
    const date = new Date('2026-01-01T00:00:00Z');
    setCookie('test', '1', { expires: date });
    expect(document.cookie).toContain(`Expires=${date.toUTCString()}`);
  });

  it('sets Path', () => {
    setCookie('x', '1', { path: '/app' });
    expect(document.cookie).toContain('Path=/app');
  });

  it('sets Domain', () => {
    setCookie('x', '1', { domain: 'example.com' });
    expect(document.cookie).toContain('Domain=example.com');
  });

  it('sets Secure flag', () => {
    setCookie('x', '1', { secure: true });
    expect(document.cookie).toContain('Secure');
  });

  it('does not set Secure flag when false', () => {
    setCookie('x', '1', { secure: false });
    expect(document.cookie).not.toContain('Secure');
  });

  it('sets SameSite', () => {
    setCookie('x', '1', { sameSite: 'Strict' });
    expect(document.cookie).toContain('SameSite=Strict');
  });

  it('sets all options together', () => {
    setCookie('all', 'opts', {
      path: '/',
      domain: 'site.com',
      maxAge: 86400,
      secure: true,
      sameSite: 'Lax',
    });

    const cookie = document.cookie;
    expect(cookie).toContain('all=opts');
    expect(cookie).toContain('Path=/');
    expect(cookie).toContain('Domain=site.com');
    expect(cookie).toContain('Max-Age=86400');
    expect(cookie).toContain('Secure');
    expect(cookie).toContain('SameSite=Lax');
  });

  it('omits Expires and Max-Age when undefined', () => {
    setCookie('minimal', '1');
    expect(document.cookie).not.toContain('Expires');
    expect(document.cookie).not.toContain('Max-Age');
  });
});

describe('getCookie', () => {
  it('returns the value of an existing cookie', () => {
    cookieStore = 'theme=dark';
    expect(getCookie('theme')).toBe('dark');
  });

  it('returns null for a missing cookie', () => {
    cookieStore = 'theme=dark';
    expect(getCookie('missing')).toBeNull();
  });

  it('returns null when document.cookie is empty', () => {
    expect(getCookie('anything')).toBeNull();
  });

  it('handles multiple cookies', () => {
    cookieStore = 'a=1; b=2; c=3';
    expect(getCookie('b')).toBe('2');
  });

  it('decodes encoded values', () => {
    const encoded = encodeURIComponent('hello world');
    cookieStore = `msg=${encoded}`;
    expect(getCookie('msg')).toBe('hello world');
  });

  it('decodes encoded names', () => {
    cookieStore = `${encodeURIComponent('user id')}=42`;
    expect(getCookie('user id')).toBe('42');
  });

  it('handles value with equals sign', () => {
    cookieStore = 'token=abc==def';
    expect(getCookie('token')).toBe('abc==def');
  });
});

describe('deleteCookie', () => {
  it('sets Expires to epoch', () => {
    deleteCookie('x');
    expect(document.cookie).toContain('Expires=Thu, 01 Jan 1970 00:00:00 GMT');
  });

  it('sets Max-Age to 0', () => {
    deleteCookie('x');
    expect(document.cookie).toContain('Max-Age=0');
  });

  it('sets empty value', () => {
    deleteCookie('x');
    expect(document.cookie).toMatch(/^x=;/);
  });

  it('forwards path option', () => {
    deleteCookie('x', { path: '/app' });
    expect(document.cookie).toContain('Path=/app');
  });

  it('forwards domain option', () => {
    deleteCookie('x', { domain: 'example.com' });
    expect(document.cookie).toContain('Domain=example.com');
  });

  it('forwards secure and sameSite options', () => {
    deleteCookie('x', { secure: true, sameSite: 'None' });
    expect(document.cookie).toContain('Secure');
    expect(document.cookie).toContain('SameSite=None');
  });
});
