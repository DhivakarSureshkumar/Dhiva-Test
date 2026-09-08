// ZeTa Framework Standard v1 — Base Page Object (Playwright TypeScript)
// Every generated Page Object extends this. Do not put test logic here.
import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  // ZeTa locator strategy (priority order): data-testid > role+name > label > text > placeholder > CSS
  protected byTestId(id: string): Locator { return this.page.getByTestId(id); }
  protected byRole(role: Parameters<Page['getByRole']>[0], name: string | RegExp): Locator {
    return this.page.getByRole(role, { name });
  }
  protected byLabel(label: string | RegExp): Locator { return this.page.getByLabel(label); }

  async goto(path: string): Promise<void> {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  async expectVisible(target: Locator): Promise<void> {
    await expect(target).toBeVisible();
  }

  async expectFieldError(fieldTestId: string, message: string): Promise<void> {
    const region = this.page.getByTestId(`${fieldTestId}-error`);
    await expect(region).toHaveText(message);
  }
}