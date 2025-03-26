import { type Page } from '@playwright/test';
import { BasePage } from './base.page';
import { checkoutSelectors } from '../locators/checkout.locators';

export class CheckoutPage extends BasePage {
  private selectors: typeof checkoutSelectors;

  constructor(page: Page) {
    super(page);
    this.selectors = checkoutSelectors;
  }

  async submitCheckoutInfo(firstName?: string, lastName?: string, zip?: string) {
    if (firstName) {
      await this.selectors.firstNameInput(this.page).fill(firstName);
    }
    if (lastName) {
      await this.selectors.lastNameInput(this.page).fill(lastName);
    }
    if (zip) {
      await this.selectors.zipInput(this.page).fill(zip);
    }

    await this.selectors.continueButton(this.page).click();
  }

  async getPriceSummary(priceLabel: 'subtotal' | 'tax' | 'total') {
    const priceSelectors = {
      subtotal: this.selectors.subtotal(this.page),
      tax: this.selectors.tax(this.page),
      total: this.selectors.total(this.page),
    };

    const pricesText = await priceSelectors[priceLabel].textContent();
    return pricesText ? parseFloat(pricesText.replace(/[^\d.]/g, '')) : 'No amount found';
  }

  async finishCheckout() {
    await this.selectors.finishButton(this.page).click();
  }
}
