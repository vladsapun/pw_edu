import { Page } from 'playwright'

export class HeaderFragment {
  constructor(public readonly page: Page) {}

  root = this.page.locator('app-header')
  menuBar = this.root.getByLabel('Main menu')
  homeButton = this.menuBar.getByTestId('nav-home')
  categoryButton = this.menuBar.getByTestId('nav-categories')
  contactButton = this.menuBar.getByTestId('nav-contact')
  logoButton = this.root.locator('.navbar-brand')
  menuItem = this.menuBar.getByTestId('nav-menu')
}
