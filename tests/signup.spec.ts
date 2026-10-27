import { test, expect } from '@playwright/test';

test('Signup successfully', async ({ page }) => {
  await page.goto('/register');
  
  await page.getByPlaceholder('Username').fill('robo');
  await page.getByPlaceholder('Email').fill('robin@mailinator.com');
  await page.getByPlaceholder('Password').fill('Password123$');

  await page.getByRole('button', { name: 'Sign up' }).click();

  await expect(page).toHaveURL('/');
});
