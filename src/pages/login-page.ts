import { Page } from 'playwright'
import { BasePage } from './base-page'

interface LoginResponse {
  access_token: string;
  [key: string]: unknown; 
}

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page, '/auth/login')
  }

  emailField = this.page.getByTestId('email')
  passwordField = this.page.getByTestId('password')
  submitButton = this.page.getByTestId('login-submit')

  async loginFE() {
    await this.page.goto('https://practicesoftwaretesting.com/auth/login')
    await this.emailField.fill('customer2@practicesoftwaretesting.com')
    await this.passwordField.fill('welcome01')
    await this.submitButton.click()
    await this.page.waitForURL('https://practicesoftwaretesting.com/account');
  }

  async loginAPI(): Promise<string> {
    const response = await this.page.request.post('https://api.practicesoftwaretesting.com/users/login', {
      data: {
        email: 'customer2@practicesoftwaretesting.com',
        password: 'welcome01'
      }
    });
    const jsonData = (await response.json()) as LoginResponse;
    return jsonData.access_token;
  }

}
