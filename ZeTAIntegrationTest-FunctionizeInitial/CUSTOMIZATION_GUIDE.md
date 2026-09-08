<!--
# Customization Guide: Converting Functionize to Playwright

This guide walks you through customizing the POM framework for your CRM application.
Estimated time: 30-45 minutes
-->

# Playwright CRM Automation - Customization Guide

## Quick Start

### 1. Set Up Environment Variables

Create a `.env` file in your project root:

```bash
# Authentication
CRM_USERNAME=your_username
CRM_PASSWORD=your_password
CRM_DEALERSHIP=Your Dealership Name

# Test Data
TEST_FIRST_NAME=TestUser
TEST_LAST_NAME=AutomatedTest
TEST_EMAIL=testuser@example.com
TEST_ZIP=10008
TEST_SSN=555123456
TEST_BIRTHDAY=26/11/2025

# Environment URLs
STAGING_URL=https://stagingnext.eleadcrm.com
QA_URL=https://qa.eleadcrm.com

# Debugging (optional)
DEBUG_MODE=true
CAPTURE_SCREENSHOTS=true
SLOW_MO=500  # Milliseconds between actions (helps see what's happening)
```

**⚠️ Important:** Add `.env` to `.gitignore` to prevent credentials from being committed.

```bash
# In .gitignore
.env
.env.local
*.local
```

### 2. Run the Test with Debug Mode

```bash
# Interactive debug mode (pauses at page.pause())
npm run test:headed -- TC_005 --debug

# Or with environment variables
DEBUG_MODE=true CAPTURE_SCREENSHOTS=true npm run test:headed -- TC_005
```

---

## Finding Correct Element Selectors

### Method 1: Browser Developer Tools (Fastest)

1. Open your browser's Developer Tools (`F12`)
2. Use the Inspector tool (top-left corner)
3. Click on the element you want to target
4. Right-click → Copy → CSS Selector (or XPath)
5. Update the locator files with the correct selector

**Example:**
```typescript
// In crmLoginLocators.ts
export function crmLoginLocators(page: Page) {
  return {
    usernameInput: page.locator('#userName'),  // ← Update with actual ID
    passwordInput: page.locator('#password'),  // ← Update with actual ID
    signInButton: page.locator('button[type="submit"]'),  // ← Update selector
  };
}
```

### Method 2: Playwright Inspector (Interactive)

```bash
# Launch Playwright Inspector
npx playwright inspector

# Or enable in test with:
test('Debug test', async ({ page }) => {
  await page.pause();  // Test will pause here, Inspector opens
  // Inspect elements in real-time
});
```

### Method 3: Debug Utility (Automatic Logging)

The framework includes a `SelectorDebugger` utility for automatic element discovery:

```typescript
import { SelectorDebugger } from '../src/utils/selectorDebugger';

test('Find all form inputs', async ({ page }) => {
  const debugger = new SelectorDebugger(page, true);  // Enable debug mode

  // Take screenshot before navigation
  await debugger.screenshot('login-page');

  // Find all elements matching a pattern
  const results = await debugger.findElementsByPattern('username');

  // Get all form inputs on the page
  const allInputs = await debugger.getAllFormInputs();

  // Highlight an element on screen
  await debugger.highlightElement('#userName');
});
```

---

## Step-by-Step Customization

### Step 1: Identify Login Page Elements

Navigate to: `https://stagingnext.eleadcrm.com/evo2/fresh/login.asp`

**Using Browser DevTools:**
1. Inspect the username input field
2. Look for: `id`, `name`, `placeholder`, or `aria-label` attributes
3. Copy the CSS selector

**Update:** [src/locators/crmLoginLocators.ts](src/locators/crmLoginLocators.ts)

```typescript
export function crmLoginLocators(page: Page) {
  return {
    // ← Find ACTUAL selectors from your app
    usernameInput: page.locator('input[name="Login1$UserName"]'),  // Example
    passwordInput: page.locator('input[name="Login1$Password"]'),  // Example
    signInButton: page.locator('input[type="submit"][value="Sign In"]'),  // Example
    // ... rest of locators
  };
}
```

### Step 2: Find Dealership Selection Selector

After login, look for the dealership dropdown:

**Common patterns to look for:**
- `<select>` element with dealership options
- Autocomplete/typeahead input
- Dropdown button with role="listbox"

```typescript
// Example: If it's a <select>
dealershipInput: page.locator('select[name="dealershipSelect"]'),

// Example: If it's an autocomplete <input>
dealershipInput: page.locator('input[placeholder*="Dealership"]'),

// Example: If it's a div with typeahead
dealershipInput: page.locator('[role="combobox"]'),
```

### Step 3: Map Add Prospect Form Fields

Navigate to the Add Prospect page and map each field:

| Functionize JSON Key | Expected Field | How to Find Selector |
|---|---|---|
| `szFirstName` | First Name input | Look for `name*="FirstName"` or `placeholder*="First"` |
| `szLastName` | Last Name input | Look for `name*="LastName"` or `placeholder*="Last"` |
| `szZip` | ZIP code input | Look for `name*="Zip"` or `type="text"` near address |
| `listPrimaryEmployees` | Dropdown/select | Look for `name*="Employee"` or label "Primary Employee" |
| `lSourceID` | Source dropdown | Look for `name*="Source"` |
| `szType` | Type dropdown | Look for `name*="Type"` |
| `szComments` | Comments textarea | Look for `textarea[name*="Comment"]` |

**Update:** [src/locators/addProspectLocators.ts](src/locators/addProspectLocators.ts)

```typescript
export function addProspectLocators(page: Page) {
  return {
    // Replace these with actual selectors from your app
    firstNameInput: page.locator('input[name="ctl00$MainContent$FormContent$FirstName"]'),
    lastNameInput: page.locator('input[name="ctl00$MainContent$FormContent$LastName"]'),
    emailInput: page.locator('input[type="email"]'),
    zipInput: page.locator('input[name*="ZipCode"]'),
    // ... etc
  };
}
```

### Step 4: Map Credit Report Form Fields

Navigate to the credit report page and find:

| Field | Selector Pattern |
|---|---|
| SSN Input | `name*="ssn"` or `placeholder*="SSN"` |
| Birthday Input | `name*="birthday"` or `name*="dob"` |
| TransUnion checkbox | `name*="transunion"` or `id*="tu"` |
| Equifax checkbox | `name*="equifax"` or `id*="eq"` |
| Experian checkbox | `name*="experian"` or `id*="ex"` |

**Update:** [src/locators/creditReportLocators.ts](src/locators/creditReportLocators.ts)

---

## Testing Your Customizations

### Test 1: Login Flow Only

Create a quick test to verify login selectors:

```bash
npm run test:headed -- --grep "Login"
```

### Test 2: Verify All Form Elements Exist

```bash
# Run with debug mode to see all elements found
DEBUG_MODE=true npm run test:headed -- TC_005
```

### Test 3: Full Test Run

```bash
npm test -- TC_005
```

---

## Troubleshooting Selector Issues

### Problem: "Timeout waiting for locator to be visible"

**Solution:**
1. Take a screenshot to see what's on the page:
   ```typescript
   await page.screenshot({ path: 'debug.png' });
   ```
2. Check if the element exists with different selectors
3. Use `ElementFinder` to try multiple fallbacks:
   ```typescript
   const finder = new ElementFinder(page);
   const input = await finder.findAny([
     'input[name="username"]',
     'input[id="userName"]',
     'input[placeholder*="User"]',
   ]);
   ```

### Problem: Dropdown not selecting value

**Solution:**
1. Verify it's actually a `<select>` element (not a custom dropdown)
2. Check available options:
   ```typescript
   const options = await page.locator('select option').allTextContents();
   console.log('Available options:', options);
   ```
3. If custom dropdown, you may need to click it first:
   ```typescript
   await page.locator('[role="combobox"]').click();
   await page.locator(`[role="option"]:has-text("${value}")`).click();
   ```

### Problem: Element exists but isn't clickable

**Solution:**
1. Element might be covered by another element (check z-index)
2. Element might not be fully loaded - add wait:
   ```typescript
   await page.waitForLoadState('networkidle');
   ```
3. Use `force` click if needed (not recommended):
   ```typescript
   await locator.click({ force: true });
   ```

---

## Common CRM Patterns

### Pattern 1: ASP.NET Form Controls

Many older CRMs use ASP.NET, which generates complex IDs:

```html
<!-- Original: <input id="userName" name="ctl00$MainContent$UserName" /> -->
```

**Strategy:** Use `name*=` selector instead of ID:
```typescript
page.locator('input[name*="UserName"]')
```

### Pattern 2: Dropdown with TypeAhead

If dealership selection is a typeahead:

```typescript
async selectDealership(dealershipName: string) {
  // Type in the input
  await this.locators.dealershipInput.fill(dealershipName);
  
  // Wait for dropdown to appear
  await this.page.waitForTimeout(300);
  
  // Click the matching option
  await this.page.locator(`text=${dealershipName}`).first().click();
}
```

### Pattern 3: Form Submission with Navigation

After form submit, page may redirect:

```typescript
async submitForm() {
  // Wait for navigation to complete
  await Promise.all([
    this.page.waitForNavigation({ waitUntil: 'networkidle' }),
    this.locators.submitButton.click(),
  ]);
}
```

---

## Advanced: Dynamic IDs and Prospect Linking

The Functionize JSON shows that after creating a prospect, you need to navigate to the credit report page with dynamic `pid` (prospect ID) and `did` (deal ID) parameters.

**Solution:** Capture these IDs from the page:

```typescript
async getProspectId(): Promise<string> {
  // Wait for page to load with prospect ID
  await this.page.waitForSelector('[data-testid="prospect-id"]');
  
  // Extract from text, URL, or attribute
  const idText = await this.page.textContent('[data-testid="prospect-id"]');
  return idText?.trim() ?? '';
}

async navigateToCreditReportWithDynamicIds(prospectId: string, dealId: string) {
  const baseUrl = 'https://qa.eleadcrm.com/evo2/fresh/elead-v45/elead_track/desking/RequestCreditReport.aspx';
  const url = `${baseUrl}?oppty=true&pid=${prospectId}&did=${dealId}&autosetscore=False&score=undefined&eq=undefined&ex=undefined&tu=0`;
  
  await this.goto(url);
}
```

---

## Next Steps

1. ✅ Create `.env` file with your credentials
2. ✅ Run test with `DEBUG_MODE=true`
3. ✅ Inspect each page and update selectors in locator files
4. ✅ Test each step (login → dealership → prospect → credit report)
5. ✅ Verify all assertions pass

**Questions?** Check the [Playwright Locator Documentation](https://playwright.dev/docs/locators)

