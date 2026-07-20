import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly loginCredentials: Locator;
  readonly loginPassword: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.loginCredentials = page.locator('#login_credentials');
    this.loginPassword = page.locator('.login_password');
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async getUsernames(): Promise<string[]> {
    const credentialText = await this.loginCredentials.innerText();

    return credentialText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.endsWith('_user'));
  }

  async getPassword(): Promise<string> {
    const passwordText = await this.loginPassword.innerText();
    const lines = passwordText.split('\n').map((line) => line.trim()).filter(Boolean);

    return lines.at(-1) ?? '';
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoginPage() {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/');
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }
}
