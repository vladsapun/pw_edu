import { expect, Page } from '@playwright/test';
import { BasePage } from './base-page';
import { HeaderFragment } from '../components/header-fragment';

export class ProductPage extends BasePage {
  constructor(page: Page) {
    super(page, '/product')
  }

  productName = this.page.getByTestId('product-name');
  productPrice = this.page.getByTestId('unit-price');
  addToCartButton = this.page.getByTestId('add-to-cart');
  addToFavoritesButton = this.page.getByTestId('add-to-favorites');
  alert = this.page.getByRole('alert');

  public async addToCart() {
    const header = new HeaderFragment(this.page);
    const productPage = new ProductPage(this.page);
    await productPage.addToCartButton.click();
    await expect(productPage.alert).toHaveText('Product added to shopping cart.');
    await expect(productPage.alert).toBeHidden({ timeout: 8000 });
    await expect (header.cartQuantity).toHaveText('1');
  }

  public async openCart() {
    const header = new HeaderFragment(this.page);
    await header.cartIcon.click();
  }
}
