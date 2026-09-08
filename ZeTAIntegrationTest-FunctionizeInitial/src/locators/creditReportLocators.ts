/**
 * Locators for CRM Credit Report Request page/section
 * Based on discovered selectors from eLead CRM prospectapplication
 */
import { Page, Locator } from '@playwright/test';

export function creditReportLocators(page: Page) {
  return {
    // Personal identification for credit report
    // These may be on the Add Prospect form or a separate credit report section
    ssnInput: page.locator('[name="szSSN"]'),
    birthdayInput: page.locator('#bdate'),
    
    // Credit bureau request checkboxes
    // Names may vary depending on the implementation
    // Try common naming patterns for this CRM
    transUnionCheckbox: page.locator(
      '[name*="transunion"], [id*="transunion"], ' +
      '[name*="TransUnion"], [id*="TransUnion"], ' +
      '[value*="TransUnion"], input[type="checkbox"]:nth-of-type(1)'
    ),
    equifaxCheckbox: page.locator(
      '[name*="equifax"], [id*="equifax"], ' +
      '[name*="Equifax"], [id*="Equifax"], ' +
      '[value*="Equifax"], input[type="checkbox"]:nth-of-type(2)'
    ),
    experianCheckbox: page.locator(
      '[name*="experian"], [id*="experian"], ' +
      '[name*="Experian"], [id*="Experian"], ' +
      '[value*="Experian"], input[type="checkbox"]:nth-of-type(3)'
    ),

    // Submit/Request buttons
    requestCreditReportButton: page.locator(
      'button:has-text("Request Credit Report"), ' +
      'a:has-text("Request Credit Report"), ' +
      'input[value="Request Credit Report"]'
    ),
    saveButton: page.locator('#btnSave'), // May use same save button as prospect form

    // Verification elements
    successMessage: page.locator('[role="alert"], .success-message, .alert-success'),
    errorMessage: page.locator('[role="alert"][class*="error"], .error-message, .alert-error'),
    
    // Help identifying current bureau status
    bureauStatusSection: page.locator('[id*="bureau"], [class*="bureau"], [class*="credit"]'),
  };
}
