import { test, expect } from '@playwright/test';
import { SignupPage } from '../pages/signup.page';

test('Signup successfully', async ({ page }) => {
  const signupPage = new SignupPage(page);
  await signupPage.goto();
  await signupPage.signup("robo", "robin@gmail.com", "Password123$");

  await expect(page).toHaveURL('/');
});


test.describe('Signup - Username validation', () => {
  test('Should reject username containing special characters', async ({page})=> {
    const signupPage = new SignupPage(page);
    await signupPage.goto();
    await signupPage.signup("robo@#$#@#", "robin@gmail.com", "Password123$");

    await expect(page).not.toHaveURL('/');
  })

  test('Should reject username containing whitespace', async ({page})=>{
    const signupPage = new SignupPage(page);
    await signupPage.goto();
    await signupPage.signup("robo 123", "robin@gmail.com", "Password123$");

    await expect(page).not.toHaveURL('/');
  })

  test('Should reject an empty username', async ({page})=>{
    const signupPage = new SignupPage(page);
    await signupPage.goto();
    await signupPage.fillUsername('');
    await signupPage.fillEmail('robin@gmail.com');
    await signupPage.fillPassword('Password123$');

    await expect(signupPage.signupButton).toBeDisabled();
  })

  test('Should reject username below minimum length', async ({page})=>{
    const signupPage = new SignupPage(page);
    await signupPage.goto();
    await signupPage.signup('ro', 'robin@gmail.com', 'Password123$');

    await expect(page).not.toHaveURL('/');
  })
})

test.describe('Signup - email address validation', () => {
  test('Should reject email address containing invalid special characters', async ({page})=> {
    const signupPage = new SignupPage(page);
    await signupPage.goto();
    await signupPage.signup("robo", "ro*bin@gmail.com", "Password123$");

    await expect(page).not.toHaveURL('/');
  })

  test('Should reject email containing whitespace between characters', async ({page})=>{
    const signupPage = new SignupPage(page);
    await signupPage.goto();
    await signupPage.signup("robo", "ro   bin@gmail.com", "Password123$");
    await expect(page.getByText('email is invalid')).toBeVisible();
  })

  test('Should reject an empty email address', async ({page})=>{
    const signupPage = new SignupPage(page);
    await signupPage.goto();
    await signupPage.fillUsername('robo');
    await signupPage.fillEmail('');
    await signupPage.fillPassword('Password123$');

    await expect(signupPage.signupButton).toBeDisabled();
  })
  
  test('Should reject email address with only local part', async ({page})=>{
    const signupPage = new SignupPage(page);
    await signupPage.goto();
    await signupPage.signup('robo', 'robin', 'Password123$');
    
    await expect(page.getByText('email is invalid')).toBeVisible();
    await expect(page).not.toHaveURL('/');
  })
})
