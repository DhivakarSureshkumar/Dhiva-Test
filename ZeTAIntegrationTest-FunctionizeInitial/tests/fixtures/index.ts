import { test as base } from '@playwright/test';

export const test = base.extend<{
  // authenticated: import('@playwright/test').Page;
}>({
  // authenticated: async ({ page }, use) => {
  //   await page.goto('/login');
  //   await page.fill('[data-testid="email"]', process.env.TEST_USER_EMAIL ?? '');
  //   await page.fill('[data-testid="password"]', process.env.TEST_USER_PASSWORD ?? '');
  //   await page.click('[data-testid="submit"]');
  //   await use(page);
  // },
});
export { expect } from '@playwright/test';