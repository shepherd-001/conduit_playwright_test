import {BasePage} from "./base.page";

export class SignupPage extends BasePage {
  private readonly usernameInput = this.page.getByRole('textbox', { name: 'Username' })
  private readonly emailInput =  this.page.getByRole('textbox', { name: 'Email' })
  private readonly passwordInput = this.page.getByPlaceholder('Password', { exact: true })
  private readonly signupButton = this.page.getByRole('button', { name: 'Sign up', exact: true })


  // async goto(path: string = "/register"): Promise<void> {
  //   await this.goto(path);
  // }

  async goto(): Promise<void> {
    await this.navigateTo("/register");
  }

  async fillUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async submit(): Promise<void> {
    await this.signupButton.click();
  }

  async signup(username: string, email: string, password: string): Promise<void>{
    await this.usernameInput.fill(username);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);

    await this.submit();
  }
}
