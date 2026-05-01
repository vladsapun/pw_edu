import { test } from '@playwright/test'
import path from 'path';
import { LoginPage } from '../pages/login-page';

 const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test('Verify successful login', async ({ page }) => {
   const loginPage = new LoginPage(page)
   await loginPage.login()
    await page.context().storageState({ path: authFile });
});