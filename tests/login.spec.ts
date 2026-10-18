import { test, expect } from '@playwright/test';

test.describe('login', () => {
  test('successful login with existing user', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="name"]', 'ivan');
    await page.fill('input[name="password"]', 'qwerty12');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/profile');
  });

  test('invalid password: shows error', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="name"]', 'notfound');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    await expect(page.getByText(/wrong username or password/i)).toBeVisible();
  });
});
