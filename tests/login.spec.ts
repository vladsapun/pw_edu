import { test, expect } from "@playwright/test";

test("User can log in", async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/auth/login");
    await page.getByLabel('Email address *').fill('customer@practicesoftwaretesting.com');
    await page.getByPlaceholder('Your password').fill('welcome01');
    await page.getByTestId('login-submit').click();
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/account')
    await expect(page.getByTestId('page-title')).toContainText('My account');
    await expect(page.getByTestId('nav-menu')).toContainText('Jane Doe');
});