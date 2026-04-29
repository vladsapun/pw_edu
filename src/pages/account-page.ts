import { Page } from 'playwright'
import { BasePage } from './base-page'

export class AccountPage extends BasePage {
  constructor(page: Page) {
    super(page, '/account')
  }

  pageTitle = this.page.getByTestId('page-title')

  async waitForPageLoad() {
    await this.page.waitForURL('https://practicesoftwaretesting.com/account')
    await this.pageTitle.waitFor({ state: 'visible' })
  }
}
