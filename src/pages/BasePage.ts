import { Page, Locator } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(path = '/'): Promise<void> {
    await this.page.goto(path);
    await this.page.waitForLoadState('domcontentloaded');
  }

  // Visual highlight for demos. This is the ONLY place a short timeout is allowed.
  async highlight(locator: Locator): Promise<void> {
    await locator.evaluate((el) => {
      (el as HTMLElement).style.outline = '3px solid #f59e0b';
      (el as HTMLElement).style.backgroundColor = 'rgba(245,158,11,0.15)';
    });
    await this.page.waitForTimeout(400);
    await locator.evaluate((el) => {
      (el as HTMLElement).style.outline = '';
      (el as HTMLElement).style.backgroundColor = '';
    });
  }
}
