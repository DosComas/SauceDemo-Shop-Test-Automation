import { type Page } from '@playwright/test';
import { BasePage } from './base.page';
import { cartSelectors } from '../locators/cart.locators';

export class CartPage extends BasePage {
  private selectors: typeof cartSelectors;

  constructor(page: Page) {
    super(page);
    this.selectors = cartSelectors;
  }

  async gotoCheckout() {
    await this.selectors.checkoutButton(this.page).click();
  }
}
