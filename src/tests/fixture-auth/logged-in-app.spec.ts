import { test } from '../../../fixtures';

test('Verify user can proceed to payment', async ({ loggedInApplication }) => {
  await loggedInApplication.allPages.accPage.navigate();
  await loggedInApplication.allPages.accPage.waitForPageLoad();
  await loggedInApplication.allPages.header.homeButton.click();
  await loggedInApplication.allPages.homePage.firstProduct.click();
  const productPrice = await loggedInApplication.allPages.productPage.productPrice.textContent();
  const productName = await loggedInApplication.allPages.productPage.productName.textContent();
  await loggedInApplication.allPages.productPage.addToCart();
  await loggedInApplication.allPages.productPage.openCart();
  await loggedInApplication.allPages.cartPage.verifyProductTitleInCart(productName!);
  await loggedInApplication.allPages.cartPage.verifyProductPriceInCart(productPrice!);
  await loggedInApplication.allPages.cartPage.clickProceedButton();
  await loggedInApplication.allPages.cartPage.verifyAlreadyLoggedInMessage();
  await loggedInApplication.allPages.cartPage.clickProceedToCheckoutButton();
  await loggedInApplication.allPages.cartPage.selectCountry('Ukraine');
  await loggedInApplication.allPages.cartPage.fillPostalCode('12345');
  await loggedInApplication.allPages.cartPage.fillHouseNumber('10');
  await loggedInApplication.allPages.cartPage.fillState('Kyiv');
  await loggedInApplication.allPages.cartPage.clickProceedToPayment();
  await loggedInApplication.allPages.cartPage.selectPaymentMethod('Credit Card');
  await loggedInApplication.allPages.cartPage.fillCreditCardDetails('1111-1111-1111-1111', '111', 'John Doe');
  await loggedInApplication.allPages.cartPage.clickConfirmButton();
  await loggedInApplication.allPages.cartPage.verifyPaymentSuccess();
});
