# Playwright CRM Automation Framework

**Converted from Functionize JSON Export**  
**Framework Version:** 1.0  
**Last Updated:** August 24, 2026

## 📋 Overview

This project automates a multi-page CRM workflow using Playwright and TypeScript, following the **Page Object Model (POM)** pattern. The test case was converted from a Functionize JSON export.

### What This Test Does

**TC_005: Prospect Creation with Credit Report Request**

```
1. Login to CRM with credentials
   ↓
2. Select dealership from dropdown
   ↓
3. Navigate to "Add Prospect"
   ↓
4. Fill prospect form (name, email, source, type, comments)
   ↓
5. Submit and verify prospect created
   ↓
6. Navigate to credit report page
   ↓
7. Fill credit report form (SSN, birthday, credit bureaus)
   ↓
8. Request credit report and verify submission
```

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your credentials
```

### 3. Run the Test
```bash
npm test -- TC_005
```

### 4. View Results
```bash
npm run report
```

---

## 📁 Project Structure

```
demo/
├── src/
│   ├── config/
│   │   └── index.ts                          # Centralized configuration
│   ├── locators/
│   │   ├── crmLoginLocators.ts              # Login page selectors
│   │   ├── addProspectLocators.ts           # Prospect form selectors
│   │   └── creditReportLocators.ts          # Credit report selectors
│   ├── pages/
│   │   ├── BasePage.ts                      # Base page class
│   │   ├── CRMLoginPage.ts                  # Login workflow
│   │   ├── AddProspectPage.ts               # Prospect creation
│   │   └── CreditReportPage.ts              # Credit report request
│   ├── testdata/
│   │   └── crmTestData.ts                   # Test data & interfaces
│   ├── utils/
│   │   ├── selectorDebugger.ts              # Debug & logging utilities
│   │   └── elementFinder.ts                 # Flexible element finding
│   └── fixtures/                             # Shared test fixtures
├── tests/
│   ├── spec/
│   │   └── TC_005_Prospect_Credit_Report.spec.ts  # Main test file
│   └── fixtures/
│       └── index.ts                          # Fixture definitions
├── scripts/
│   └── findSelectors.ts                     # Helper script to find selectors
├── .env.example                              # Environment template
├── CUSTOMIZATION_GUIDE.md                    # Step-by-step customization
├── QUICK_START_CHECKLIST.md                  # Simple checklist
├── CONVERSION_SUMMARY.md                     # What was created
├── playwright.config.ts                      # Playwright configuration
├── tsconfig.json                             # TypeScript configuration
└── package.json                              # Dependencies & scripts
```

---

## 🔧 Configuration

### Environment Variables (`.env`)

Required:
```
CRM_USERNAME=your_username
CRM_PASSWORD=your_password
CRM_DEALERSHIP=Your Dealership Name
STAGING_URL=https://stagingnext.eleadcrm.com
```

Optional:
```
DEBUG_MODE=true                  # Enable debug logging
CAPTURE_SCREENSHOTS=true         # Save screenshots
SLOW_MO=500                      # Milliseconds between actions
TEST_FIRST_NAME=TestUser
TEST_LAST_NAME=AutomatedTest
TEST_EMAIL=testuser@example.com
```

### Playwright Config

See `playwright.config.ts` for:
- Timeout settings (30 seconds default)
- Browser configuration
- Retry policy (2 retries on failure)
- Artifact capture (videos, traces, screenshots)

---

## 🧪 Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run specific test
npm test -- TC_005

# Run with browser visible
npm run test:headed -- TC_005

# Run in debug mode (interactive)
npm run test:headed -- TC_005 --debug

# Run with debug logging
DEBUG_MODE=true npm run test:headed -- TC_005

# Run with slowdown (500ms between actions)
SLOW_MO=500 npm run test:headed -- TC_005

# View test report
npm run report

# Update snapshots (if using visual regression)
npm test -- --update-snapshots
```

---

## 🔍 Debugging

### Method 1: Browser DevTools
1. Open test with: `npm run test:headed -- TC_005`
2. Press `F12` to open Developer Tools
3. Inspect elements to find correct selectors
4. Right-click → Copy CSS selector

### Method 2: Playwright Inspector
```bash
npm run test:headed -- TC_005 --debug
```
Interactive inspector opens, allowing you to step through actions and inspect elements in real-time.

### Method 3: Debug Utilities
The framework includes built-in debugging:

```typescript
import { SelectorDebugger } from '../src/utils/selectorDebugger';

test('Debug test', async ({ page }) => {
  const debug = new SelectorDebugger(page, true);
  
  // Log all form inputs on page
  await debug.getAllFormInputs();
  
  // Screenshot for manual inspection
  await debug.screenshot('my-page');
  
  // Find elements by pattern
  await debug.findElementsByPattern('dealership');
  
  // Highlight element on screen
  await debug.highlightElement('#dealershipDropdown');
});
```

### Method 4: Helper Script
```bash
npm run debug:selectors -- --page login
npm run debug:selectors -- --page prospect
npm run debug:selectors -- --page credit-report
```

---

## 📝 Understanding the Architecture

### Page Object Model (POM)

Each page has:
1. **Locator file** — Element selectors (what to find)
2. **Page object** — Action methods (what to do)
3. **Test spec** — Test scenarios (what to verify)

### Example: Login

```typescript
// 1. Locators (crmLoginLocators.ts)
usernameInput: page.locator('input[name="username"]'),
passwordInput: page.locator('input[name="password"]'),

// 2. Page Object (CRMLoginPage.ts)
async login(username: string, password: string) {
  await this.locators.usernameInput.fill(username);
  await this.locators.passwordInput.fill(password);
  await this.locators.signInButton.click();
}

// 3. Test (TC_005_*.spec.ts)
const loginPage = new CRMLoginPage(page);
await loginPage.login(testData.username, testData.password);
```

### Benefits
- **Maintainability** — Change selectors in one place (locator file)
- **Reusability** — Use same page object in multiple tests
- **Readability** — Test reads like a business flow, not technical details
- **Type Safety** — Full TypeScript typing throughout

---

## ⚙️ Customization

### Step 1: Find Selectors

Use Browser DevTools or the provided debug script:

```bash
npm run debug:selectors -- --page login
```

### Step 2: Update Locator Files

Edit the `.ts` files in `src/locators/` with correct selectors:

```typescript
// Before (template)
usernameInput: page.locator('[data-testid="username"]'),

// After (actual selector from your CRM)
usernameInput: page.locator('input[name="ctl00$MainContent$UserName"]'),
```

### Step 3: Run Tests

```bash
npm run test:headed -- TC_005
```

### Step 4: Iterate

If elements aren't found, update selectors and try again.

**See [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md) for detailed instructions.**

---

## 🧠 Key Classes

### BasePage
Base class for all page objects. Provides:
- `goto(path)` — Navigate to URL with wait
- `highlight(locator)` — Highlight element (useful for debugging)

### CRMLoginPage
Handles login workflow:
- `navigateToLogin(url)`
- `login(username, password)`
- `selectDealership(name)`
- `navigateToAddProspect()`
- `verifyLoggedIn()`

### AddProspectPage
Handles prospect creation:
- `fillProspectForm(data)`
- `submitProspect()`
- `verifyProspectCreated(firstName, lastName)`
- `getProspectId()`

### CreditReportPage
Handles credit report request:
- `fillCreditReportForm(data)`
- `requestCreditReport()`
- `verifyBirthdayFieldVisible()`
- `verifyCreditReportRequested()`
- `checkCreditBureauStatus(bureau)`

### SelectorDebugger
Debugging utilities:
- `log(message, data)` — Log with timestamp
- `screenshot(filename)` — Capture screenshot
- `highlightElement(selector)` — Highlight on page
- `findElementsByPattern(pattern)` — Find all matching elements
- `getAllFormInputs()` — List all inputs on page

### ElementFinder
Flexible element location:
- `findInputByName(name)`
- `findSelectByLabel(label)`
- `findButtonByText(text)`
- `findByAriaLabel(label)`
- `findAny(selectors)` — Try multiple selectors

---

## 📊 Test Data

Test data is defined in `src/testdata/crmTestData.ts`:

```typescript
export interface CRMTestDataRow {
  environment: 'staging' | 'qa' | 'production';
  username: string;
  password: string;
  dealership: string;
  firstName: string;
  lastName: string;
  // ... more fields
}
```

You can:
- Add multiple test data rows
- Load from external sources (CSV, database, API)
- Parameterize tests to run with different data

Example:
```typescript
test.describe.each(crmTestData)('With $dealership', (data) => {
  test('Create prospect', async ({ page }) => {
    // Test runs once per data row
  });
});
```

---

## 🎯 Next Steps

### For First-Time Users
1. ✅ Install dependencies: `npm install`
2. ✅ Create `.env` file with credentials
3. ✅ Update selectors using [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md)
4. ✅ Run test: `npm run test:headed -- TC_005`

### To Extend the Framework
- Add more page objects for other workflows
- Create additional test cases
- Add custom assertions
- Set up CI/CD pipeline
- Generate reports

### For Production Use
- Add error handling and retry logic
- Implement logging and reporting
- Set up test data management
- Add performance monitoring
- Configure parallel execution

---

## 🛠️ Troubleshooting

### "Timeout waiting for locator"
→ Selector is incorrect. Use DevTools to find actual selector.

### "Element not clickable"
→ Element might be covered. Add `waitForLoadState()` before action.

### "Dropdown not selecting"
→ Check if it's a `<select>` or custom dropdown. May need different approach.

### "Cannot find module"
→ Run `npm install` and check import paths.

### Tests pass locally but fail in CI
→ Check environment variables are set in CI configuration.

---

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [CSS Selectors Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)

---

## 📄 Documentation

- **[CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md)** — Detailed customization steps
- **[QUICK_START_CHECKLIST.md](QUICK_START_CHECKLIST.md)** — Simple checklist format
- **[CONVERSION_SUMMARY.md](CONVERSION_SUMMARY.md)** — What was created from Functionize JSON
- **[POM_FRAMEWORK.md](contract/POM_FRAMEWORK.md)** — Framework architecture

---

## 📞 Support

For issues or questions:

1. Check the [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md)
2. Enable debug mode: `DEBUG_MODE=true npm run test:headed -- TC_005`
3. Run the selector finder: `npm run debug:selectors -- --page login`
4. Review Playwright docs: https://playwright.dev

---

**Happy Testing! 🎭**

