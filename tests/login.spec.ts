import { test, expect } from '../test.setup';
import { inventorySelectors } from '../locators/inventory.locators';
import { loginSelectors } from '../locators/login.locators';

const validUsername = process.env.VALID_USERNAME as string;
const validPassword = process.env.VALID_PASSWORD as string;

test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ page }) => {
  await test.step('Navigate to web page', async () => {
    await page.goto('/');
  });
});

test('Valid login', { tag: '@TC-1.1' }, async ({ page, loginPage }) => {
  await test.step('Enter valid username and password', async () => {
    await loginPage.login(validUsername, validPassword);
  });

  await test.step('User logs in and lands on the products page', async () => {
    await expect(page, 'User should be logged into the landing page').toHaveURL('/inventory.html');
    await expect(inventorySelectors.pageHeader(page), 'Incorrect page header title').toContainText(
      'Swag Labs'
    );
    await expect(inventorySelectors.cartButton(page), 'Cart button not visible').toBeVisible();
  });
});

[
  { title: 'username', username: 'invalid_user', password: validPassword },
  { title: 'password', username: validUsername, password: 'bad_sauce' },
].forEach(({ title, username, password }) => {
  test(`Invalid ${title} login`, { tag: '@TC-1.2' }, async ({ page, loginPage }) => {
    await test.step('Enter invalid username or password', async () => {
      await loginPage.login(username, password);
    });

    await test.step('Error message is displayed', async () => {
      await expect(
        loginSelectors.errorIcons(page),
        'Both username and password should have error icons'
      ).toHaveCount(2);

      await expect(
        loginSelectors.errorMessage(page),
        'Error message mismatch or not displayed'
      ).toContainText('Epic sadface: Username and password do not match any user in this service');
    });
  });
});
