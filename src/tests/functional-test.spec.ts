import { test, expect } from '@playwright/test';
import path from 'path';
import { AccountPage } from '../pages/account-page';
import { HomePage, SortOption } from '../pages/home-page';
import { ProductPage } from '../pages/product-page';
import { HeaderFragment } from '../components/header-fragment';
import { CartPage } from '../pages/cart-page';
import { PowerTools } from '../components/product-categories';

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
});

test.describe('Verify user can perform sorting by name', () => {
  const testCases: { order: SortOption; label: string }[] = [
    { order: 'name,asc', label: 'name ascending' },
    { order: 'name,desc', label: 'name descending' },
  ];

  for (const { order, label } of testCases) {
    test(`Sorting ${label}`, async ({ page }) => {
      const homePage = new HomePage(page);
      const header = new HeaderFragment(page);
      await page.goto('https://practicesoftwaretesting.com/account');
      await header.homeButton.click();
      await homePage.selectSortingOption(order);
      const actualNames = await homePage.productNames.allTextContents();
      const expectedNames = [...actualNames].sort((a, b) => {
        return order === 'name,asc' ? a.localeCompare(b) : b.localeCompare(a);
      });
      expect(actualNames).toEqual(expectedNames);
    });
  }
});

test.describe('Verify user can perform sorting by prices', () => {
  const testCases: { order: SortOption; label: string }[] = [
    { order: 'price,asc', label: 'price ascending' },
    { order: 'price,desc', label: 'price descending' },
  ];

  for (const { order, label } of testCases) {
    test(`Sorting ${label}`, async ({ page }) => {
      const homePage = new HomePage(page);
      const header = new HeaderFragment(page);
      await page.goto('https://practicesoftwaretesting.com/account');
      await header.homeButton.click();
      await homePage.selectSortingOption(order);
      const rawPrices = await homePage.productPrices.allTextContents();
      const actualPrices = rawPrices.map((p) => parseFloat(p.replace('$', '')));
      const expected = [...actualPrices].sort((a, b) => (order.endsWith('asc') ? a - b : b - a));
      expect(actualPrices).toEqual(expected);
    });
  }
});

test.describe('Verify user can filter products by category', () => {
  test(`Filter products by category: ${PowerTools.SANDER}`, async ({ page }) => {
    const homePage = new HomePage(page);
    const header = new HeaderFragment(page);
    await page.goto('https://practicesoftwaretesting.com/account');
    await header.homeButton.click();
    await homePage.selectCategory(PowerTools.SANDER);
    const sortedNames = await homePage.productNames.allTextContents();
    const expectedNames = [...sortedNames].filter((name) => name.toLowerCase().includes('sander'));
  });
});
