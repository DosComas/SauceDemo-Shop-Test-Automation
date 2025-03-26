import { type Page } from '@playwright/test';
import { baseSelectors } from '../locators/base.locators';

export class BasePage {
  readonly page: Page;
  private baseSelectors: typeof baseSelectors;

  constructor(page: Page) {
    this.page = page;
    this.baseSelectors = baseSelectors;
  }

  async getItemsPrices() {
    const pricesText = await this.baseSelectors.allItemsPrices(this.page).allTextContents();
    return pricesText.map((price) => parseFloat(price.replace('$', '').trim()));
  }
}
