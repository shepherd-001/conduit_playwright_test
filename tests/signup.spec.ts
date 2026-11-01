import { test, expect } from '@playwright/test';
import { SignupPage } from '../pages/signup.page';

test('Signup successfully', async ({ page }) => {
  const signupPage = new SignupPage(page);
  signupPage.goto();
  signupPage.signup("robo", "robin@mailinator.com", "Password123$");

  await expect(page).toHaveURL('/');


  // await page.goto('/register');
  
  // await page.getByPlaceholder('Username').fill('robo');
  // await page.getByPlaceholder('Email').fill('robin@mailinator.com');
  // await page.getByPlaceholder('Password').fill('Password123$');

  // await page.getByRole('button', { name: 'Sign up' }).click();

  // await expect(page).toHaveURL('/');
});
