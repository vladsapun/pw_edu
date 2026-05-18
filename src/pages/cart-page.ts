import { expect, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page, '/checkout');
  }

  tableRows = this.page.getByTestId('product-specs').locator('table tbody tr');  
  productTitle = this.page.getByTestId('product-title');
  productPrice = this.page.getByTestId('product-price');
  proceedButton = this.page.getByTestId('proceed-1');
  proceedToCheckoutButton = this.page.getByTestId('proceed-2');
  continueShoppingButton = this.page.getByTestId('continue-shopping');
  cartTotal = this.page.getByTestId('cart-quantity');
  alreadyLoggedInMessage = this.page.locator('.login-container p');

  billing = {
    countryField: this.page.getByTestId('country'),
    postalCodeField: this.page.getByTestId('postal_code'),
    houseNumberField: this.page.getByTestId('house_number'),
    stateField: this.page.getByTestId('state'),
    proceedToPaymentButton: this.page.getByTestId('proceed-3')
  }

  payment = {
    paymentMethodSelect: this.page.getByTestId('payment-method'),
    creditCardNumberField: this.page.getByTestId('credit_card_number'),
    expirationDateField: this.page.getByTestId('expiration_date'),
    cvvField: this.page.getByTestId('cvv'),
    cardholderNameField: this.page.getByTestId('card_holder_name'),
    confirmButton: this.page.getByTestId('finish'),
    paymentSuccessMessage: this.page.getByTestId('payment-success-message')
  };


  async verifyCartHasItem(count: number) {
    await expect(this.cartTotal).toHaveText(count.toString());
  }

  async verifyProductTitleInCart(productTitle: string) {
    await expect(this.productTitle).toHaveText(productTitle);
  }

async verifyProductPriceInCart(expectedPrice: number | string) {
  const priceAsNumber = typeof expectedPrice === 'number' 
    ? expectedPrice 
    : parseFloat(expectedPrice);

  const formattedPrice = `$${priceAsNumber.toFixed(2)}`;

  await expect(this.productPrice).toHaveText(formattedPrice);
}

async clickProceedButton() {
  await this.proceedButton.click();
}

async clickProceedToCheckoutButton() {
  await this.proceedToCheckoutButton.click();
}

async verifyAlreadyLoggedInMessage() {
  await expect(this.alreadyLoggedInMessage).toBeVisible();
  await expect(this.alreadyLoggedInMessage).toContainText('you are already logged in. You can proceed to checkout');
}

async selectCountry(country: string) {
  await this.billing.countryField.selectOption(country);
}

async fillPostalCode(postalCode: string) {
  await expect(this.billing.postalCodeField).toBeVisible();
  await this.billing.postalCodeField.fill(postalCode);
}

async fillHouseNumber(houseNumber: string) {
  await expect(this.billing.houseNumberField).toBeVisible();
  await this.billing.houseNumberField.fill(houseNumber);
}

async fillState(state: string) {
  await expect(this.billing.stateField).toBeVisible();
  await this.billing.stateField.fill(state);
}

async clickProceedToPayment() {
  await expect(this.billing.proceedToPaymentButton).toBeVisible();
  await this.billing.proceedToPaymentButton.click();  
}

async selectPaymentMethod(method: string) {
  await this.payment.paymentMethodSelect.selectOption(method);
}

async fillCreditCardDetails(cardNumber: string, cvv: string, cardHolderName: string, expirationDate?: string) {
let finalDate = expirationDate;
  if (!finalDate) {
    const date = new Date();
    date.setMonth(date.getMonth() + 3);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
    finalDate = `${month}/${year}`;
  }

  await this.payment.creditCardNumberField.fill(cardNumber);
  await this.payment.expirationDateField.fill(finalDate);
  await this.payment.cvvField.fill(cvv);
  await this.payment.cardholderNameField.fill(cardHolderName);
}

async clickConfirmButton() {
  await this.payment.confirmButton.click();
}

async verifyPaymentSuccess() {
  await expect(this.payment.paymentSuccessMessage).toBeVisible();
  await expect(this.payment.paymentSuccessMessage).toHaveText('Payment was successful');
}
}