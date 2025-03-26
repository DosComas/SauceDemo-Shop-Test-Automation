import { test, expect } from '../test.setup';
import { loginSelectors } from '../locators/login.locators';

test.beforeEach(async ({ page }) => {
  await test.step('Navigate to web page', async () => {
    await page.goto('/inventory.html');
  });
});

test('Logout', { tag: '@TC-6.1' }, async ({ page, inventoryPage }) => {
  await test.step('Do Logout', async () => {
    await inventoryPage.logout();
  });

  await test.step('User is logged out and redirected to the login page,', async () => {
    await expect(page, 'User should be redirected into the landing page').toHaveURL('/');

    await expect(loginSelectors.loginButton(page), 'Login button not visible').toBeVisible();
  });
});
