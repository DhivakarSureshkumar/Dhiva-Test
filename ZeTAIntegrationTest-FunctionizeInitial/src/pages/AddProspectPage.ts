/**
 * Add Prospect Page Object
 */
import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { addProspectLocators } from '../locators/addProspectLocators';
import { CRMTestDataRow } from '../testdata/crmTestData';

export class AddProspectPage extends BasePage {
  private locators: ReturnType<typeof addProspectLocators>;

  constructor(page: Page) {
    super(page);
    this.locators = addProspectLocators(page);
  }

  async navigateToAddProspect(url: string) {
    await this.goto(url);
  }

  async fillProspectForm(data: CRMTestDataRow) {
    // Fill basic information
    await this.locators.firstNameInput.fill(data.firstName);
    await this.locators.lastNameInput.fill(data.lastName);
    
    // Handle email input
    await this.locators.emailInput.fill(data.email);
    
    // Handle zip code
    await this.locators.zipInput.fill(data.zip);

    // Select primary employee
    await this.locators.primaryEmployeeSelect.selectOption(data.primaryEmployee);

    // Select source
    await this.locators.sourceSelect.selectOption(data.source);

    // Select prospect type
    await this.locators.prospectTypeSelect.selectOption(data.prospectType);

    // Add comments
    await this.locators.commentsTextarea.fill(data.comments);
  }

  async submitProspect() {
    await this.locators.saveButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyProspectCreated(firstName: string, lastName: string) {
    const prospectNameElement = this.locators.prospectName(firstName, lastName);
    await prospectNameElement.waitFor({ state: 'visible', timeout: 10000 });
  }

  async getProspectId(): Promise<string> {
    // Extract prospect ID from the displayed text or from the page
    // This may vary based on the actual HTML structure
    const idText = await this.page.textContent('[data-testid="prospect-id"]');
    return idText?.trim() ?? '';
  }
}
