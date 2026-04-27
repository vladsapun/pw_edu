import { Page } from "playwright";
import { PageFragmentConstructor } from "./page-fragment-constructor";

export class HeaderFragment extends PageFragmentConstructor {
    constructor(page: Page) {
        super(page);
    }

    root = this.page.locator('app-header');
    menuBar = this.root.getByLabel('Main menu');
    homeButton = this.menuBar.getByTestId('nav-home');
    categoryButton = this.menuBar.getByTestId('nav-categories');
    contactButton = this.menuBar.getByTestId('nav-contact');
    logoButton = this.root.locator('.navbar-brand');
    menuItem = this.menuBar.getByTestId('nav-menu');
}