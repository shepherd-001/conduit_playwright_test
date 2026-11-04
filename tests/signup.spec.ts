import { test, expect } from '@playwright/test';
import { SignupPage } from '../pages/signup.page';

test('Signup successfully', async ({ page }) => {
  const signupPage = new SignupPage(page);
  await signupPage.goto();
  await signupPage.signup("robo", "robin@mailinator.com", "Password123$");

  await expect(page).toHaveURL('/');
});


test.describe('Signup - Username validation', () => {
  test('Should reject username containing special characters', async ({page})=> {
    const signupPage = new SignupPage(page);
    await signupPage.goto();
    await signupPage.signup("robo@#$#@#", "robin@mailinator.com", "Password123$");

    await expect(page).not.toHaveURL('/');
  })

  test('Should reject username containing whitespace', async ({page})=>{
    const signupPage = new SignupPage(page);
    await signupPage.goto();
    await signupPage.signup("robo 123", "robin@gmail.com", "Password123$");

    await expect(page).not.toHaveURL('/');
  })
})






//   test('Should reject username containing whitespace', async ({ page }) => {
//     const signupPage = new SignupPage(page);

//     await signupPage.goto();

//     await signupPage.signup(
//       'robo 123',
//       'robin@mailinator.com',
//       'Password123$'
//     );

//     await expect(page).not.toHaveURL('/');
//   });

//   test('Should reject an empty username', async ({ page }) => {
//     const signupPage = new SignupPage(page);

//     await signupPage.goto();

//     await signupPage.signup(
//       '',
//       'robin@mailinator.com',
//       'Password123$'
//     );

//     await expect(page).not.toHaveURL('/');
//   });

//   test('Should reject username below minimum length', async ({ page }) => {
//     const signupPage = new SignupPage(page);

//     await signupPage.goto();

//     await signupPage.signup(
//       'ro',
//       'robin@mailinator.com',
//       'Password123$'
//     );

//     await expect(page).not.toHaveURL('/');
//   });

// }); 