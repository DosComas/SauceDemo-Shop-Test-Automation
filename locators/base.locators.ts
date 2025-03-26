// locators\base.locators.ts
import { Locator } from '@playwright/test';
import { type Page } from '@playwright/test';

export const baseSelectors = {
  allItemsPrices: (page: Page): Locator => page.getByTestId('inventory-item-price'),
};
