import { Page } from 'playwright';
import { BasePage } from './base-page';

export type SortOption = 
  | 'name,asc' 
  | 'name,desc' 
  | 'price,asc' 
  | 'price,desc' 
  | 'co2_rating,asc' 
  | 'co2_rating,desc';

export class HomePage extends BasePage {
  constructor(page: Page, pageUrl = '/') {
    super(page, pageUrl);
  }

  sortingDropdown = this.page.getByTestId('sort');
  productNames = this.page.getByTestId('product-name');
  productPrices = this.page.getByTestId('product-price');


  getProductByName(name: string) {
    return this.productNames.filter({ hasText: name });
  }

  async getAllProductNames(): Promise<string[]> {
    return await this.productNames.allInnerTexts();
  }

async getAllProductPrices(): Promise<number[]> {
    const prices = await this.productPrices.allInnerTexts();
    return prices.map(p => parseFloat(p.replace('$', '').trim()));
  }

  async selectSortingOption(option: SortOption) {
    await this.sortingDropdown.selectOption(option);
    await this.page.waitForLoadState('networkidle');
  }
}
