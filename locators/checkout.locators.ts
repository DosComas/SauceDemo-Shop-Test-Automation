// locators\checkout.locators.ts
import { Locator } from '@playwright/test';
import { type Page } from '@playwright/test';

export const checkoutSelectors = {
  firstNameInput: (page: Page): Locator => page.getByTestId('firstName'),
  lastNameInput: (page: Page): Locator => page.getByTestId('lastName'),
  zipInput: (page: Page): Locator => page.getByTestId('postalCode'),
  continueButton: (page: Page): Locator => page.getByTestId('continue'),
  errorMessage: (page: Page): Locator => page.getByTestId('error'),
  subtotal: (page: Page): Locator => page.getByTestId('subtotal-label'),
  tax: (page: Page): Locator => page.getByTestId('tax-label'),
  total: (page: Page): Locator => page.getByTestId('total-label'),
  finishButton: (page: Page): Locator => page.getByTestId('finish'),
};
