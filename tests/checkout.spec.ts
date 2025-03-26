import { test, expect } from '../test.setup';
import { checkoutSelectors } from '../locators/checkout.locators';

const productQty = 3;
const taxRate = 0.08;
const customer = { firstName: 'Test1', lastName: 'Test2', zip: '1234' };

test.beforeEach(async ({ page, inventoryPage, cartPage }) => {
  await test.step('Navigate to web page', async () => {
    await page.goto('/inventory.html');
  });

  await test.step(`Add 3 product/s to the cart`, async () => {
    await inventoryPage.addToCart(productQty);
  });

  await test.step('Go to checkout', async () => {
    await inventoryPage.gotoCart();
    await cartPage.gotoCheckout();
  });
});

test('Successful Checkout', { tag: '@TC-4.1' }, async ({ page, checkoutPage }) => {
  await test.step('Submit required details', async () => {
    await checkoutPage.submitCheckoutInfo(customer.firstName, customer.lastName, customer.zip);
  });

  await test.step('Validate price', async () => {
    const actualPrices = await checkoutPage.getItemsPrices();

    const expectedSubtotal = actualPrices.reduce((acc, num) => acc + num, 0);
    const expectedTax = parseFloat((expectedSubtotal * taxRate).toFixed(2));
    const expectedTotal = expectedSubtotal + expectedTax;

    const actualSubtotal = await checkoutPage.getPriceSummary('subtotal');
    const actualTax = await checkoutPage.getPriceSummary('tax');
    const actualTotal = await checkoutPage.getPriceSummary('total');

    expect(actualSubtotal).toEqual(expectedSubtotal);

    expect(actualTax).toEqual(expectedTax);

    expect(actualTotal).toEqual(expectedTotal);
  });

  await test.step('Finish order', async () => {
    await checkoutPage.finishCheckout();

    await expect(page).toHaveURL('/checkout-complete.html');
  });
});

[
  { title: 'First Name', firstName: '', lastName: customer.lastName, zip: customer.zip },
  { title: 'Last Name', firstName: customer.firstName, lastName: '', zip: customer.zip },
  { title: 'Postal Code', firstName: customer.firstName, lastName: customer.lastName, zip: '' },
].forEach(({ title, firstName, lastName, zip }) => {
  test(`Checkout with Missing ${title}`, { tag: '@TC-4.2' }, async ({ page, checkoutPage }) => {
    await test.step('Submit required details', async () => {
      await checkoutPage.submitCheckoutInfo(firstName, lastName, zip);
    });

    await test.step('A validation error is displayed', async () => {
      await expect(checkoutSelectors.errorMessage(page)).toContainText(
        `Error: ${title} is required`
      );
    });
  });
});
