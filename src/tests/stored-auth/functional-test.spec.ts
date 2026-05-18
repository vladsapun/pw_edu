import { test, expect } from '../../../fixtures';
import { SortOption } from '../../pages/home-page';
import { PowerTools } from '../../components/product-categories';


test('Verify user can add product to cart', async ({ application, page }) => {
  await application.allPages.accPage.navigate();
  await application.allPages.accPage.waitForPageLoad();
  await application.allPages.header.homeButton.click();
  await application.allPages.homePage.getProductByName('Slip Joint Pliers').click();
  await expect(page).toHaveURL(/\/product\/.+/);
  await expect(application.allPages.productPage.productPrice).toHaveText('9.17');
  await application.allPages.productPage.addToCart();
  await application.allPages.productPage.openCart();
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/checkout');
  await application.allPages.cartPage.verifyCartHasItem(1);
  await application.allPages.cartPage.verifyProductTitleInCart('Slip Joint Pliers');
  await expect(application.allPages.cartPage.proceedButton).toBeVisible();
});

test.describe('Verify user can perform sorting by name', () => {
  const testCases: { order: SortOption; label: string }[] = [
    { order: 'name,asc', label: 'name ascending' },
    { order: 'name,desc', label: 'name descending' },
  ];

  for (const { order, label } of testCases) {
    test(`Sorting ${label}`, async ({application }) => {
      await application.allPages.accPage.navigate();
      await application.allPages.header.homeButton.click();
      await application.allPages.homePage.selectSortingOption(order);
      const actualNames = await application.allPages.homePage.productNames.allTextContents();
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
    test(`Sorting ${label}`, async ({application }) => {
      await application.allPages.accPage.navigate();
      await application.allPages.header.homeButton.click();
      await application.allPages.homePage.selectSortingOption(order);
      const rawPrices = await application.allPages.homePage.productPrices.allTextContents();
      const actualPrices = rawPrices.map((p) => parseFloat(p.replace('$', '')));
      const expected = [...actualPrices].sort((a, b) => (order.endsWith('asc') ? a - b : b - a));
      expect(actualPrices).toEqual(expected);
    });
  }
});

test.describe('Verify user can filter products by category', () => {
  test(`Filter products by category: ${PowerTools.SANDER}`, async ({ application }) => {
    await application.allPages.accPage.navigate();
    await application.allPages.header.homeButton.click();
    await application.allPages.homePage.selectCategory(PowerTools.SANDER);
    const sortedNames = await application.allPages.homePage.productNames.allTextContents();
    const expectedNames = [...sortedNames].filter((name) => name.toLowerCase().includes('sander'));
    expect(sortedNames).toEqual(expectedNames);
  });
});
