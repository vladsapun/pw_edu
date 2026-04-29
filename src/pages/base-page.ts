import { Page } from 'playwright'

export class BasePage {
  public pageUrl: string
  public page: Page

  constructor(page: Page, pageUrl: string) {
    this.page = page
    this.pageUrl = pageUrl
  }
}
