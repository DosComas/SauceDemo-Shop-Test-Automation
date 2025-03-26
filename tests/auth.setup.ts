import { test as setup, expect } from '../test.setup';
import path from 'path';

const authFile = path.join(__dirname, '../.auth/user.json');

const validUsername = process.env.VALID_USERNAME as string;
const validPassword = process.env.VALID_PASSWORD as string;

setup('Authenticate', async ({ page, loginPage }) => {
  await page.goto('');
  await loginPage.login(validUsername, validPassword);

  await expect(page, 'User should be logged into the landing page').toHaveURL('/inventory.html');

  await page.context().storageState({ path: authFile });
});
