import { Page } from "playwright";
import { PageConstructor } from "../components/page-constructor";

export class BasePage extends PageConstructor{
    public pageUrl: string;
    public page: Page;

    constructor(page: Page, pageUrl: string) {
        super(page);
        this.page = page;
        this.pageUrl = pageUrl;
    }

}