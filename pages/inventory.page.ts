import { type Page } from '@playwright/test';
import { BasePage } from './base.page';
import { inventorySelectors } from '../locators/inventory.locators';

export class InventoryPage extends BasePage {
  private selectors: typeof inventorySelectors;

  constructor(page: Page) {
    super(page);
    this.selectors = inventorySelectors;
  }

  async logout() {
    await this.selectors.openMenuButton(this.page).click();
    await this.selectors.logoutButton(this.page).click();
  }

  async addToCart(quantity: number) {
    for (let i = 0; i < quantity; i++) {
      await this.selectors.addToCartButton(this.page).first().click();
    }
  }

  async removeFromCart(quantity: number) {
    for (let i = 0; i < quantity; i++) {
      await this.selectors.removeFromCartButton(this.page).first().click();
    }
  }

  async gotoCart() {
    await this.selectors.cartButton(this.page).click();
  }

  async selectSortOption(sortBy: 'priceLowToHigh' | 'priceHighToLow') {
    const sortOption = {
      priceLowToHigh: 'lohi',
      priceHighToLow: 'hilo',
    };

    await this.selectors.productSortDropdown(this.page).selectOption(sortOption[sortBy]);
  }
}
