/**
 * CRM Login and Navigation Page Object
 */
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { crmLoginLocators } from '../locators/crmLoginLocators';

export class CRMLoginPage extends BasePage {
  private locators: ReturnType<typeof crmLoginLocators>;

  constructor(page: Page) {
    super(page);
    this.locators = crmLoginLocators(page);
  }

  async navigateToLogin(url: string) {
    await this.goto(url);
  }

  async login(username: string, password: string) {
    await this.locators.usernameInput.fill(username);
    await this.locators.passwordInput.fill(password);
    await this.locators.signInButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectDealership(dealershipName: string) {
    await this.locators.dealershipInput.click();
    await this.page.waitForTimeout(500); // Wait for dropdown to open
    
    // Find and click the dealership option
    const option = this.locators.dealershipOption(dealershipName);
    await option.click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectLanguage(language: string) {
    const dropdown = this.locators.languageDropdown;
    await dropdown.selectOption(language);
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToAddProspect() {
    await this.locators.prospectMenu.click();
    await this.page.waitForTimeout(300);
    await this.locators.addProspectLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async verifyLoggedIn() {
    // Verify we're past the login page
    await this.page.waitForURL(/.*elead_track.*/, { timeout: 10000 });
  }
}
