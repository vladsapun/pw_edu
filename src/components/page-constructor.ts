import { Page } from "@playwright/test";

export class PageConstructor {
    constructor(protected readonly page: Page) {
        this.page = page;
    }
}