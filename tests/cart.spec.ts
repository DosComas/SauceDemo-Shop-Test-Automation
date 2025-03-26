import { test, expect } from '../test.setup';
import { inventorySelectors } from '../locators/inventory.locators';

test.beforeEach(async ({ page }) => {
  await test.step('Navigate to web page', async () => {
    await page.goto('/inventory.html');
  });
});

[
  { title: 'Single', addQuantity: 1, testID: '@TC-2.1' },
  { title: 'Five', addQuantity: 5, testID: '@TC-2.2' },
].forEach(({ title, addQuantity, testID }) => {
  test(`Add ${title} Product/s to Cart`, { tag: testID }, async ({ page, inventoryPage }) => {
    await test.step(`Add ${addQuantity} product/s to the cart`, async () => {
      await inventoryPage.addToCart(addQuantity);
    });

    await test.step(`The cart badge updates to show ${addQuantity}`, async () => {
      await expect(
        inventorySelectors.cartCount(page),
        'Cart badge count mismatch or not displayed'
      ).toContainText(addQuantity.toString());
    });
  });
});

[
  { title: 'Add 1 and Remove 1', addQuantity: 1, removeQuantity: 1 },
  { title: 'Add 4 and Remove 2', addQuantity: 4, removeQuantity: 2 },
].forEach(({ title, addQuantity, removeQuantity }) => {
  test(`${title} Products from Cart`, { tag: '@TC-4.1' }, async ({ page, inventoryPage }) => {
    await test.step(`Add ${addQuantity} product/s to the cart`, async () => {
      await inventoryPage.addToCart(addQuantity);
    });

    await test.step(`Remove ${removeQuantity} product/s from the cart`, async () => {
      await inventoryPage.removeFromCart(removeQuantity);
    });

    await test.step(`The cart badge updates its count`, async () => {
      const expectedCartCount = addQuantity - removeQuantity;

      const cartBadge = inventorySelectors.cartCount(page);
      if (expectedCartCount == 0) {
        await expect(cartBadge, 'Cart badge should not be visible when empty').not.toBeVisible();
      } else {
        await expect(cartBadge, 'Cart badge count mismatch or not displayed').toContainText(
          expectedCartCount.toString()
        );
      }
    });
  });
});
