import { test as base } from '@playwright/test';
import { AllPages } from './src/pages/all-pages';
export { expect } from '@playwright/test';

type MyFixtures = {
  application: {
    allPages: AllPages;
  } 
    loggedInApplication: {
    allPages: AllPages;
  }
};

export const test = base.extend<MyFixtures>({
  application: async ({ page }, use) => {
    const application = {
    allPages: new AllPages(page)
  }; 
  await use(application);
  }, 

  loggedInApplication: async ({ application }, use) => {
    await application.allPages.loginPage.login();
    await use(application);
  }

});

