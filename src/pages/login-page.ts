import { Page } from "playwright";
import { BasePage } from "./base-page";
import yaml from "js-yaml";
import fs from "fs";
import path from "path";

interface Credentials {
  email: string;
  password: string;
  username?: string;
}

export class LoginPage extends BasePage {

    constructor(page: Page) {
      super(page, "/auth/login");
    }

    emailField = this.page.getByLabel('Email address *');
    passwordField = this.page.getByPlaceholder('Your password');
    submitButton = this.page.getByTestId('login-submit');

    private loadCredentials(): Credentials {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      const credentialsPath = path.join(__dirname, "../data/credentials.yaml");
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      const fileContents = fs.readFileSync(credentialsPath, "utf8");
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return yaml.load(fileContents) as Credentials;
    }

    async login(credentials?: Credentials) {
      const creds = credentials || this.loadCredentials();
      await this.page.goto("https://practicesoftwaretesting.com/auth/login");
      await this.emailField.fill(creds.email);
      await this.passwordField.fill(creds.password);
      await this.submitButton.click();
    }
}