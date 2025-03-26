import { type Page } from '@playwright/test';
import { BasePage } from './base.page';
import { loginSelectors } from '../locators/login.locators';

export class LoginPage extends BasePage {
  private selectors: typeof loginSelectors;

  constructor(page: Page) {
    super(page);
    this.selectors = loginSelectors;
  }

  async login(username: string, password: string) {
    await this.selectors.usernameInput(this.page).fill(username);
    await this.selectors.passwordInput(this.page).fill(password);
    await this.selectors.loginButton(this.page).click();
  }
}
