import { test, expect } from '@playwright/test'
import path from 'path';
import { AccountPage } from '../pages/account-page'
import { HomePage } from '../pages/home-page'
import { ProductPage } from '../pages/product-page'
import { HeaderFragment } from '../components/header-fragment'
import { CartPage } from '../pages/cart-page';

// test.beforeEach(async ({ page }) => {
//   const loginPage = new LoginPage(page)
//   await loginPage.login()
// })

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test.use({ storageState: authFile });

test('Verify user can add product to cart', async ({ page }) => {
  const header = new HeaderFragment(page);
  const homePage = new HomePage(page);
  const accountPage = new AccountPage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  await page.goto('https://practicesoftwaretesting.com/account');
  await accountPage.waitForPageLoad();
  await header.homeButton.click();
  await homePage.getProductByName('Slip Joint Pliers').click();
  await expect(page).toHaveURL(/\/product\/.+/);
  await expect(productPage.productPrice).toHaveText('9.17');
  await productPage.addToCart();
  await productPage.openCart();
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/checkout');
  await cartPage.verifyCartHasItem(1);
  await cartPage.verifyProductTitleInCart('Slip Joint Pliers');
  await expect(cartPage.proceedButton).toBeVisible();
})

test ('Verify user can perform sorting by name (asc & desc', async ({ page }) => {
  const homePage = new HomePage(page)
  const productPage = new ProductPage(page)
  const header = new HeaderFragment(page)
  await page.goto('https://practicesoftwaretesting.com/account');
  await header.homeButton.click()
  await homePage.getProductByName('Combination Pliers').click()
  await expect(productPage.productName).toHaveText('Combination Pliers')
  await expect(page).toHaveURL(/\/product\/.+/)
  await expect(productPage.productPrice).toHaveText('14.15')
  await expect(productPage.addToCartButton).toBeVisible()
  await expect(productPage.addToFavoritesButton).toBeVisible()
})

test ('Verify user can perform sorting by price (asc & desc)', async ({ page }) => {
  const homePage = new HomePage(page)
  const productPage = new ProductPage(page)
  const header = new HeaderFragment(page)
  await page.goto('https://practicesoftwaretesting.com/account');
  await header.homeButton.click()
  await homePage.getProductByName('Combination Pliers').click()
  await expect(productPage.productName).toHaveText('Combination Pliers')
  await expect(page).toHaveURL(/\/product\/.+/)
  await expect(productPage.productPrice).toHaveText('14.15')
  await expect(productPage.addToCartButton).toBeVisible()
  await expect(productPage.addToFavoritesButton).toBeVisible()
})

test ('Verify user can filter products by category', async ({ page }) => {
  const homePage = new HomePage(page)
  const productPage = new ProductPage(page)
  const header = new HeaderFragment(page)
  await page.goto('https://practicesoftwaretesting.com/account');
  await header.homeButton.click()
  await homePage.getProductByName('Combination Pliers').click()
  await expect(productPage.productName).toHaveText('Combination Pliers')
  await expect(page).toHaveURL(/\/product\/.+/)
  await expect(productPage.productPrice).toHaveText('14.15')
  await expect(productPage.addToCartButton).toBeVisible()
  await expect(productPage.addToFavoritesButton).toBeVisible()
})