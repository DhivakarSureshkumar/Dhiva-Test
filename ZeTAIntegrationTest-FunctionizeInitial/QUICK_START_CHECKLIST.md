<!--
# Quick Start Checklist: Functionize → Playwright Automation

This checklist guides you through converting the Functionize JSON test to a working Playwright test.
Estimated time: 30-45 minutes
-->

# ✅ Quick Start Checklist

## Phase 1: Environment Setup (5 minutes)

- [ ] **Read** [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md)
- [ ] **Copy** `.env.example` to `.env`
  ```bash
  cp .env.example .env
  ```
- [ ] **Edit** `.env` with your actual credentials:
  - CRM_USERNAME
  - CRM_PASSWORD
  - CRM_DEALERSHIP
  - STAGING_URL (if different)
  - TEST_SSN, TEST_BIRTHDAY, etc.
- [ ] **Verify** `.env` is in `.gitignore`
  ```bash
  echo ".env" >> .gitignore
  ```

## Phase 2: Selector Discovery (20 minutes)

### Step 1: Login Page Selectors

- [ ] Open browser to `https://stagingnext.eleadcrm.com/evo2/fresh/login.asp`
- [ ] Open Developer Tools (`F12`)
- [ ] **Find & copy** username input selector
  - Right-click element → Inspect
  - Right-click in DevTools → Copy selector
  - Update: [src/locators/crmLoginLocators.ts](src/locators/crmLoginLocators.ts) `usernameInput`
- [ ] **Find & copy** password input selector → Update `passwordInput`
- [ ] **Find & copy** "Sign In" button selector → Update `signInButton`
- [ ] **Find & copy** dealership dropdown selector → Update `dealershipInput`
- [ ] **Find & copy** "Prospects" menu link → Update `prospectMenu`
- [ ] **Find & copy** "Add Prospect" link → Update `addProspectLink`

### Step 2: Add Prospect Page Selectors

- [ ] Navigate to Add Prospect page (or run test to step through)
- [ ] **Find & copy** First Name input → Update [src/locators/addProspectLocators.ts](src/locators/addProspectLocators.ts) `firstNameInput`
- [ ] **Find & copy** Last Name input → Update `lastNameInput`
- [ ] **Find & copy** Email input → Update `emailInput`
- [ ] **Find & copy** Zip code input → Update `zipInput`
- [ ] **Find & copy** Primary Employee dropdown → Update `primaryEmployeeSelect`
- [ ] **Find & copy** Source dropdown → Update `sourceSelect`
- [ ] **Find & copy** Type dropdown → Update `prospectTypeSelect`
- [ ] **Find & copy** Comments textarea → Update `commentsTextarea`
- [ ] **Find & copy** Save button → Update `saveButton`

### Step 3: Credit Report Page Selectors

- [ ] Navigate to Credit Report page
- [ ] **Find & copy** SSN input → Update [src/locators/creditReportLocators.ts](src/locators/creditReportLocators.ts) `ssnInput`
- [ ] **Find & copy** Birthday input → Update `birthdayInput`
- [ ] **Find & copy** TransUnion checkbox → Update `transUnionCheckbox`
- [ ] **Find & copy** Equifax checkbox → Update `equifaxCheckbox`
- [ ] **Find & copy** Experian checkbox → Update `experianCheckbox`
- [ ] **Find & copy** "Request Credit Report" button → Update `requestCreditReportButton`

## Phase 3: Testing & Verification (15 minutes)

### Initial Run

- [ ] **Run test with debug logging:**
  ```bash
  DEBUG_MODE=true npm run test:headed -- TC_005
  ```
- [ ] **Watch the browser** and verify:
  - ✅ Navigates to login page
  - ✅ Fills username and password
  - ✅ Clicks Sign In
  - ✅ Dealership selection works
  - ✅ Navigation to Add Prospect works

### Phase Break

If login works:
- [ ] **Continue watching** for prospect form
- [ ] **Verify** each field is filled correctly
- [ ] **Check** form submission
- [ ] **Confirm** navigation to credit report page

### Credit Report

- [ ] **Verify** SSN field is filled
- [ ] **Verify** Birthday field is filled
- [ ] **Verify** Credit bureau checkboxes are checked
- [ ] **Verify** Credit report request button is clicked
- [ ] **Check** for success message or navigation

## Phase 4: Troubleshooting (As Needed)

If any step fails:

- [ ] **Take screenshot** for manual inspection:
  ```typescript
  await page.screenshot({ path: 'debug.png' });
  ```
- [ ] **Enable Playwright Inspector:**
  ```bash
  npm run test:headed -- TC_005 --debug
  ```
- [ ] **Use SelectorDebugger** to find elements:
  - Check [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md) "Method 3: Debug Utility"
  - Run test and observe console output

## Phase 5: Final Validation

- [ ] **Run full test suite:**
  ```bash
  npm test -- TC_005
  ```
- [ ] **Run multiple times** to verify consistency
- [ ] **Check test report:**
  ```bash
  npm run report
  ```

## Common Issues & Solutions

| Issue | Solution |
|---|---|
| "Timeout waiting for locator" | Selector is wrong; re-inspect element in DevTools |
| "Element not clickable" | Element might be covered; add `await page.waitForLoadState()` |
| "Dropdown not selecting" | Check if it's a `<select>` or custom dropdown; use different approach |
| "Can't find text on page" | Page may not be fully loaded; increase timeout |

---

## Files Modified

After completing this checklist, these files will be updated:

- ✅ `.env` — Created with your credentials
- ✅ `src/locators/crmLoginLocators.ts` — Selectors updated
- ✅ `src/locators/addProspectLocators.ts` — Selectors updated
- ✅ `src/locators/creditReportLocators.ts` — Selectors updated

Files that do NOT need changes:
- `src/pages/*.ts` — Action methods are universal
- `tests/spec/TC_005_*.spec.ts` — Test flow is correct
- `src/config/index.ts` — Configuration is centralized
- `src/testdata/crmTestData.ts` — Data structure is correct

---

## Success Criteria

✅ Test passes when:
1. Logs in successfully (URL contains `/elead_track`)
2. Selects dealership (page loads after selection)
3. Creates prospect (prospect name appears on page)
4. Requests credit report (success message appears or page navigates)
5. All assertions pass without errors

---

## Next Steps After Success

1. **Add more test cases** for different scenarios
2. **Parameterize test data** with multiple rows
3. **Add error handling** for edge cases
4. **Set up CI/CD** to run tests on schedule
5. **Create test report dashboards** to track results

---

**Need help?** Check [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md) or run:
```bash
DEBUG_MODE=true SLOW_MO=1000 npm run test:headed -- TC_005
```

This will show you each action in slow motion with debug output.

