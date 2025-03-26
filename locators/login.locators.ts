// selectors/login.selectors.ts
import { Locator } from '@playwright/test';
import { type Page } from '@playwright/test';

export const loginSelectors = {
  usernameInput: (page: Page): Locator => page.getByTestId('username'),
  passwordInput: (page: Page): Locator => page.getByTestId('password'),
  loginButton: (page: Page): Locator => page.getByTestId('login-button'),
  errorIcons: (page: Page): Locator => page.locator('.error_icon'),
  errorMessage: (page: Page): Locator => page.getByTestId('error'),
};
