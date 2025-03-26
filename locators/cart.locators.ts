// locators\cart.locators.ts
import { Locator } from '@playwright/test';
import { type Page } from '@playwright/test';

export const cartSelectors = {
  checkoutButton: (page: Page): Locator => page.getByTestId('checkout'),
};
