/**
 * Locators for CRM Login and Navigation pages
 */
import { Page, Locator } from '@playwright/test';

export function crmLoginLocators(page: Page) {
  return {
    // Login page elements (discovered from actual CRM HTML)
    usernameInput: page.locator('input[name="user"]'),
    passwordInput: page.locator('input[name="Password"]'),
    signInButton: page.locator('#loginbtn'),

    // Language selection
    languageDropdown: page.locator('select[name="language"], [aria-label*="Language"]'),
    languageOptions: (lang: string) => page.locator(`text=${lang}`),

    // Menu navigation
    prospectMenu: page.locator('text=Prospects'),
    addProspectLink: page.locator('text=Add Prospect'),

    // Dealership/Organization selection
    dealershipInput: page.locator('[placeholder*="Dealership"], [placeholder*="Organization"]'),
    dealershipOption: (name: string) => page.locator(`[role="option"]:has-text("${name}")`),
    selectedDealership: page.locator('[data-selected="true"][role="button"]'),
  };
}
