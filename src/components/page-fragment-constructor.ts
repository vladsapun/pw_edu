import { Page } from "@playwright/test";
import { PageConstructor } from "./page-constructor";

export class PageFragmentConstructor  extends PageConstructor {
  constructor(protected readonly page: Page) {
      super(page);
  }
}