/**
 * Locators for CRM Add Prospect page
 * Real selectors discovered from staging CRM environment
 */
import { Page, Locator } from '@playwright/test';

export function addProspectLocators(page: Page) {
  return {
    // Personal Information
    firstNameInput: page.locator('[name="szFirstName"]'),
    middleNameInput: page.locator('[name="szMiddleName"]'),
    lastNameInput: page.locator('#szLastName'),
    suffixSelect: page.locator('#szSuffix'),
    
    // Contact Information
    emailInput: page.locator('[name="szAddress"]'), // Primary email
    secondaryEmailInput: page.locator('[name="szSecAddress"]'), // Secondary email
    
    // Address Information
    address1Input: page.locator('[name="szAddress1"]'),
    address2Input: page.locator('[name="szAddress2"]'),
    cityInput: page.locator('#szCity'),
    countyInput: page.locator('#szCounty'),
    stateSelect: page.locator('#lStateId'),
    zipInput: page.locator('#szZip'),
    
    // Phone Information
    homeAreaCodeInput: page.locator('#szHomeAreaCode'),
    homeNumberInput: page.locator('#szHomeNumber'),
    cellAreaCodeInput: page.locator('#szCellAreaCode'),
    cellNumberInput: page.locator('#szCellNumber'),
    workAreaCodeInput: page.locator('#szWorkAreaCode'),
    workNumberInput: page.locator('#szWorkNumber'),
    
    // Additional Personal Info
    ssnInput: page.locator('[name="szSSN"]'),
    birthdayInput: page.locator('#bdate'),
    
    // Vehicle Information
    wantedVinInput: page.locator('[name="szWantedVIN"]'),
    wantedMileageInput: page.locator('[name="lVehicleWantedMileage"]'),
    tradeVinInput: page.locator('#szTradeVIN'),
    tradeMileageInput: page.locator('#szTradeMileage'),
    
    // Source & Classification
    sourceSelect: page.locator('#ddlType'), // Source dropdown
    subSourceSelect: page.locator('[name="szSubSource"]'),
    sourceDetailsInput: page.locator('[name="szSourceDetails"]'),
    
    // Comments
    commentsTextarea: page.locator('[name="szComments"]'),

    // Actions
    saveButton: page.locator('#btnSave'),
    
    // Helper methods for dropdowns
    sourceOption: (name: string) => page.locator(`#ddlType option:has-text("${name}")`),
    subSourceOption: (name: string) => page.locator('[name="szSubSource"] option:has-text("${name}")'),
  };
}
