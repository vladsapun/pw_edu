import { Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class ProductPage extends BasePage {
     constructor(page: Page) {
          super(page, "/product");
        }

        productName = this.page.getByTestId('product-name');
        productPrice = this.page.getByTestId('unit-price');
        addToCartButton = this.page.getByTestId('add-to-cart');
        addToFavoritesButton = this.page.getByTestId('add-to-favorites');

}   