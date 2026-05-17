import { Page } from 'playwright'

export class BasePage {
  public page: Page

  constructor(page: Page) {
    this.page = page
  }
}
