import { Page } from 'playwright'
import { BasePage } from './base-page'

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page, '/auth/login')
  }

  emailField = this.page.getByTestId('email')
  passwordField = this.page.getByTestId('password')
  submitButton = this.page.getByTestId('login-submit')

  async login() {
    await this.page.goto('https://practicesoftwaretesting.com/auth/login')
    await this.emailField.fill('customer2@practicesoftwaretesting.com')
    await this.passwordField.fill('welcome01')
    await this.submitButton.click()
    await this.page.waitForURL('https://practicesoftwaretesting.com/account');
  }
}
