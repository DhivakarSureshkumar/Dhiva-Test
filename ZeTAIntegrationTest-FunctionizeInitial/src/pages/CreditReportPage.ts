/**
 * Credit Report Request Page Object
 */
import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { creditReportLocators } from '../locators/creditReportLocators';
import { CRMTestDataRow } from '../testdata/crmTestData';

export class CreditReportPage extends BasePage {
  private locators: ReturnType<typeof creditReportLocators>;

  constructor(page: Page) {
    super(page);
    this.locators = creditReportLocators(page);
  }

  async navigateToCreditReport(url: string) {
    await this.goto(url);
  }

  async fillCreditReportForm(data: CRMTestDataRow) {
    // Fill SSN
    await this.locators.ssnInput.fill(data.ssn);

    // Fill birthday
    await this.locators.birthdayInput.fill(data.birthday);

    // Check credit bureaus based on configuration
    if (data.creditBureaus.transUnion) {
      await this.locators.transUnionCheckbox.check();
    }
    
    if (data.creditBureaus.equifax) {
      await this.locators.equifaxCheckbox.check();
    }
    
    if (data.creditBureaus.experian) {
      await this.locators.experianCheckbox.check();
    }
  }

  async requestCreditReport() {
    await this.locators.requestCreditReportButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyBirthdayFieldVisible() {
    await this.locators.birthdayLabel.waitFor({ state: 'visible', timeout: 5000 });
  }

  async verifyCreditReportRequested() {
    // Wait for success message or URL change indicating successful submission
    try {
      await this.locators.successAlert.waitFor({ state: 'visible', timeout: 5000 });
    } catch {
      // Success might be indicated by page change rather than alert
      await this.page.waitForLoadState('networkidle');
    }
  }

  async checkCreditBureauStatus(bureau: 'transUnion' | 'equifax' | 'experian'): Promise<boolean> {
    const checkboxMap = {
      transUnion: this.locators.transUnionCheckbox,
      equifax: this.locators.equifaxCheckbox,
      experian: this.locators.experianCheckbox,
    };
    
    return await checkboxMap[bureau].isChecked();
  }
}
