// locators\inventory.locators.ts
import { Locator } from '@playwright/test';
import { type Page } from '@playwright/test';

export const inventorySelectors = {
  pageHeader: (page: Page): Locator => page.getByTestId('primary-header'),
  cartButton: (page: Page): Locator => page.getByTestId('shopping-cart-link'),
  openMenuButton: (page: Page): Locator => page.locator('#react-burger-menu-btn'),
  logoutButton: (page: Page): Locator => page.getByTestId('logout-sidebar-link'),
  cartCount: (page: Page): Locator => page.getByTestId('shopping-cart-badge'),
  addToCartButton: (page: Page): Locator => page.getByTestId(/^add-to-cart-sauce-labs.*/),
  removeFromCartButton: (page: Page): Locator => page.getByTestId(/^remove-sauce-labs.*/),
  productSortDropdown: (page: Page): Locator => page.getByTestId('product-sort-container'),
};
