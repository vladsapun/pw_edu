import { Page } from 'playwright';

export class BasePage {
  public page: Page;
  public pageUrl: string;

  constructor(page: Page, pageUrl: string) {
    this.page = page;
    this.pageUrl = pageUrl;
  }

  async navigate() {
    await this.page.goto(`https://practicesoftwaretesting.com${this.pageUrl}`);
  }
}
