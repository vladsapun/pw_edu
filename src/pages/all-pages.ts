import { Page } from "@playwright/test";
import { AccountPage } from "./account-page";
import { LoginPage } from "./login-page";
import { BasePage } from "./base-page";
import { CartPage } from "./cart-page";
import { HomePage } from "./home-page";
import { ProductPage } from "./product-page";
import { HeaderFragment } from "../components/header-fragment";

export class AllPages {
    loginPage: LoginPage; 
    accPage: AccountPage;
    basePage: BasePage;
    cartPage: CartPage;
    homePage: HomePage;
    productPage: ProductPage;
    header: HeaderFragment;
    
    constructor(page: Page){
        this.loginPage = new LoginPage(page);
        this.accPage = new AccountPage(page);
        this.basePage = new BasePage(page);
        this.cartPage = new CartPage(page);
        this.homePage = new HomePage(page);
        this.productPage = new ProductPage(page);
        this.header = new HeaderFragment(page);
    }

}