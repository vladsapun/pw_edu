import { Page } from "playwright";
import { BasePage } from "./base-page";

export class HomePage extends BasePage{
    constructor(page: Page, pageUrl = "/") {
        super(page, pageUrl);
    }

    productItem = this.page.getByTestId('product-name'); 

}