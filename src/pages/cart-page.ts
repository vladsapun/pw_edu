import { expect, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page, '/checkout');
  }

  tableRows = this.page.locator('table tbody tr');
  productTitle = this.page.getByTestId('product-title');
  proceedButton = this.page.getByTestId('proceed-1');
  continueShoppingButton = this.page.getByTestId('continue-shopping');

  async verifyCartHasItem(count: number) {
    await expect(this.tableRows).toHaveCount(count);
  }

  async verifyProductTitleInCart(productTitle: string) {
    await expect(this.productTitle).toHaveText(productTitle);
  }
}
