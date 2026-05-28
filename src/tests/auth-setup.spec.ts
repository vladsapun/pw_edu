/// <reference types="node" />
import { test } from '../../fixtures';
import { join } from 'node:path';
import { LoginPage } from '../pages/login-page';

const authFile = join(process.cwd(), 'playwright/.auth/user.json');

test('Verify successful login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.loginFE();
  await page.context().storageState({ path: authFile });
});
