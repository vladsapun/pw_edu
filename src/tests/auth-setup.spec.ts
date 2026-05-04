/// <reference types="node" />
import { test } from '@playwright/test';
import { join } from 'node:path';
import { LoginPage } from '../pages/login-page';

const authFile = join(process.cwd(), 'src/playwright/.auth/user.json');

test('Verify successful login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login();
  await page.context().storageState({ path: authFile });
});
