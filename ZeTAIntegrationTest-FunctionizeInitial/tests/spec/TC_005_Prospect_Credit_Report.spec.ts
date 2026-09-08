/**
 * TC_005: Prospect Creation with Credit Report Request
 * 
 * Test case converted from Functionize JSON export
 * Scenario:
 * 1. Login to CRM with credentials
 * 2. Select dealership
 * 3. Navigate to Add Prospect
 * 4. Fill prospect form with test data
 * 5. Submit prospect
 * 6. Request credit report
 * 7. Verify credit report submission
 */

import { test, expect } from '@playwright/test';
import { CRMLoginPage, AddProspectPage, CreditReportPage } from '../src/pages';
import { crmTestData } from '../src/testdata/crmTestData';

test.describe('TC_005: Prospect Creation with Credit Report', () => {
  const testData = crmTestData[0]; // Use first data row

  test('Create prospect and request credit report', async ({ page }) => {
    // Step 1: Navigate to login
    const loginPage = new CRMLoginPage(page);
    await loginPage.navigateToLogin('https://stagingnext.eleadcrm.com/evo2/fresh/login.asp');

    // Step 2: Login with credentials
    await loginPage.login(testData.username, testData.password);
    await loginPage.verifyLoggedIn();

    // Step 3: Select dealership
    await loginPage.selectDealership(testData.dealership);
    
    // Step 4: Navigate to Add Prospect
    await loginPage.navigateToAddProspect();

    // Step 5: Fill prospect form and submit
    const addProspectPage = new AddProspectPage(page);
    await addProspectPage.fillProspectForm(testData);
    await addProspectPage.submitProspect();

    // Step 6: Verify prospect was created
    await addProspectPage.verifyProspectCreated(testData.firstName, testData.lastName);
    
    // Step 7: Navigate to credit report page
    // Note: In a real scenario, you may need to capture the prospect ID from the previous step
    // and construct the credit report URL dynamically
    const creditReportPage = new CreditReportPage(page);
    await creditReportPage.navigateToCreditReport(
      'https://qa.eleadcrm.com/evo2/fresh/elead-v45/elead_track/desking/RequestCreditReport.aspx?oppty=true&pid=20812150&did=19725864&autosetscore=False&score=undefined&eq=undefined&ex=undefined&tu=0'
    );

    // Step 8: Fill credit report form
    await creditReportPage.fillCreditReportForm(testData);
    
    // Step 9: Verify birthday field is visible (per JSON requirement)
    await creditReportPage.verifyBirthdayFieldVisible();
    
    // Step 10: Request credit report
    await creditReportPage.requestCreditReport();
    
    // Step 11: Verify credit report was requested
    await creditReportPage.verifyCreditReportRequested();

    // Step 12: Verify all credit bureaus were selected
    expect(await creditReportPage.checkCreditBureauStatus('transUnion')).toBe(true);
    expect(await creditReportPage.checkCreditBureauStatus('equifax')).toBe(true);
    expect(await creditReportPage.checkCreditBureauStatus('experian')).toBe(true);
  });

  test('Verify form fields are properly populated', async ({ page }) => {
    const addProspectPage = new AddProspectPage(page);
    await addProspectPage.navigateToAddProspect(
      'https://qanext.eleadcrm.com/evo2/fresh/elead-v45/elead_track/elead_kiosk/Kiosk_Frm_NewProspect.asp'
    );

    // Fill form
    await addProspectPage.fillProspectForm(testData);

    // Verify each field was filled correctly
    // (These checks depend on how the fields expose their values)
    const firstNameValue = await page.inputValue('input[name*="szFirstName"], input[placeholder*="First Name"]');
    expect(firstNameValue).toBe(testData.firstName);

    const emailValue = await page.inputValue('input[type="email"], input[placeholder*="Email"]');
    expect(emailValue).toBe(testData.email);
  });
});
