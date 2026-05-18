import { test, expect } from '../../../fixtures';
import { AccountPage } from '../../pages/account-page';
import { HeaderFragment } from '../../components/header-fragment';
import { HomePage } from '../../pages/home-page';
import { ProductPage } from '../../pages/product-page';

test('User can log in', async ({ page }) => {
  const header = new HeaderFragment(page)
  const accountPage = new AccountPage(page)
  await page.goto('https://practicesoftwaretesting.com/account')
  await accountPage.waitForPageLoad()
  await expect(accountPage.pageTitle).toContainText('My account')
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/account')
  await expect(header.menuItem).toContainText('Jack Howe')
})

test ('Verify user can view product details', async ({ page }) => {
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
