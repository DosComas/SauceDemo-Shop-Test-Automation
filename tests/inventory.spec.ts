import { test, expect } from '../test.setup';

test.beforeEach(async ({ page }) => {
  await test.step('Navigate to web page', async () => {
    await page.goto('/inventory.html');
  });
});

[
  { title: 'low to high', sortBy: 'priceLowToHigh', isAscending: true },
  { title: 'high to low', sortBy: 'priceHighToLow', isAscending: false },
].forEach(({ title, sortBy, isAscending }) => {
  test(`Sort Products Price by ${title}`, { tag: '@TC-5.1' }, async ({ inventoryPage }) => {
    await test.step('Sort products by price', async () => {
      await inventoryPage.selectSortOption(sortBy as 'priceLowToHigh' | 'priceHighToLow');
    });

    await test.step('Products are displayed in the correct order', async () => {
      const actualPrices = await inventoryPage.getItemsPrices();

      const expectedPrices = [...actualPrices].sort((a, b) => (isAscending ? a - b : b - a));

      expect(actualPrices, `Prices are not sorted from ${title}`).toEqual(expectedPrices);
    });
  });
});
