# Playwright Framework — Naming Conventions

## Overview
Consistent naming across the framework improves maintainability, discoverability, and reduces cognitive load. This document defines the standard for all file types, classes, functions, and directories.

---

## 1. Test Specifications

### File Naming
**Pattern:** `<Feature>.spec.ts`

- `<Feature>`: Descriptive feature name in PascalCase (TC number in describe block for traceability)
- Extension: `.spec.ts` (Playwright convention)

**Examples:**
- ✅ `SendRoMessage.spec.ts` (test case TC-002)
- ✅ `ProspectCredit.spec.ts` (test case TC-004)
- ✅ `UpdateUserProfile.spec.ts`
- ❌ `test_add_todo.ts` (no description)
- ❌ `TC_001_AddTodo.spec.ts` (TC number in filename unnecessary)

### Test Suite Title (describe)
**Pattern:** `TC-<NNN>: <Human Title>`

```typescript
test.describe(`TC-002: Send and Validate RO Message`, () => {
  // tests
});
```

### Test Title (test)
**Pattern:** `<verb> <noun> and <assertion>`

```typescript
test(`sends and validates message in RO flow (${row.rowId})`, async () => {
  // test implementation
});
```

---

## 2. Page Objects

### File Naming
**Pattern:** `<Feature>Page.ts`

- `<Feature>`: Descriptive feature name in PascalCase
- Location: `src/pages/`
- Extension: `.ts`

**Examples:**
- ✅ `TodoPage.ts`
- ✅ `DemoPage.ts`
- ✅ `ServiceMessagingPage.ts`
- ✅ `UserProfilePage.ts`
- ✅ `LoginPage.ts` (not `AuthPage` - be specific)
- ❌ `todo_page.ts` (use PascalCase)
- ❌ `TodoPageObject.ts` (redundant)

### Class Naming
**Pattern:** Same as filename (PascalCase)

```typescript
export class TodoPage extends BasePage {
  // class implementation
}
```

### Method Naming
**Pattern:** camelCase, verb-first, action-oriented

**Action methods:**
- `async add<Noun>()` — user interaction that changes state
- `async open<Noun>()` — navigation
- `async toggle<Noun>()` — binary toggle
- `async select<Noun>()` — selection from dropdown/list
- `async fill<Noun>()` — form field input
- `async clear<Noun>()` — remove content

**Assertion methods:**
- `async expect<Noun>Visible()` — visibility assertion
- `async expect<Noun>NotVisible()` — negative visibility
- `async expect<Noun>Enabled()` — enabled state
- `async expect<Noun>HasText()` — text content

**Helper methods (private):**
- `private async clickIfVisible()` — reusable utility
- `private async waitForElement()` — internal helper

**Examples:**
```typescript
// ✅ Good
async addTodo(text: string): Promise<void> { }
async openUserProfile(): Promise<void> { }
async selectDealershipIfConfigured(): Promise<void> { }
async expectTodoVisible(text: string): Promise<void> { }

// ❌ Bad
async todo_add() { }  // snake_case
async AddTodo() { }   // PascalCase for method
async doAddTodo() { } // redundant prefix
```

---

## 3. Locators

### File Naming
**Pattern:** `<feature>Locators.ts`

- `<feature>`: Lowercase, matches the feature in page object
- Location: `src/locators/`
- Extension: `.ts`

**Examples:**
- ✅ `todoLocators.ts`
- ✅ `demoLocators.ts`
- ✅ `serviceMessagingLocators.ts`
- ✅ `userProfileLocators.ts`
- ❌ `TodoLocators.ts` (use lowercase)
- ❌ `todo_locators.ts` (use camelCase)

### Function Naming
**Pattern:** `<feature>Locators(page: Page)` — factory function

```typescript
export const todoLocators = (page: Page) => ({
  newTodo: page.getByPlaceholder('What needs to be done?'),
  titles: page.getByTestId('todo-item'),
});
```

### Locator Property Naming
**Pattern:** camelCase, descriptive

- Use semantic names that describe **purpose**, not implementation
- If multiple versions exist, qualify with suffix: `Input`, `Button`, `Link`, `Tab`

**Examples:**
```typescript
// ✅ Good
newTodo: page.getByPlaceholder('What needs to be done?'),
todoItems: page.getByTestId('todo-item'),
completeButton: page.getByRole('button', { name: 'Complete' }),
deleteLink: page.getByRole('link', { name: 'Delete' }),

// ❌ Bad
input1: page.locator('[data-id="todo"]'),  // meaningless name
getNewTodo: page.locator(...),  // redundant "get" prefix
btn_complete: page.locator(...),  // snake_case
```

---

## 4. Test Data

### File Naming
**Pattern:** `<flow>Data.ts` or `<flow>TestData.ts`

- `<flow>`: camelCase, matches feature/flow name
- Location: `src/testdata/`
- Extension: `.ts`

**Examples:**
- ✅ `demoData.ts`
- ✅ `serviceMessageData.ts`
- ✅ `userRegistrationData.ts`
- ✅ `creditReportData.ts`
- ❌ `demo_data.ts` (use camelCase)
- ❌ `DemoData.ts` (use lowercase)

### Export Naming
**Pattern:** Array named `<flow>Data` with typed interface

```typescript
export interface TodoDataRow {
  title: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}

export const todoData: TodoDataRow[] = [
  { title: 'Buy milk', priority: 'low', dueDate: '2026-08-20' },
  { title: 'Fix bug', priority: 'high', dueDate: '2026-08-18' },
];
```

---

## 5. Fixtures

### File Naming
**Pattern:** `index.ts` (main), `<feature>.fixture.ts` (optional feature-specific)

- Main fixtures: `tests/fixtures/index.ts`
- Feature-specific: `tests/fixtures/<feature>.fixture.ts` (if needed)
- Extension: `.ts`

**Examples:**
- ✅ `index.ts` (default location for all fixtures)
- ✅ `authenticated.fixture.ts` (if organizing by role)
- ✅ `todoApp.fixture.ts` (if isolating a complex feature)
- ❌ `fixtures.ts` (too generic)
- ❌ `service-stage-adp1connectcdkcom-d.fixture.ts` (too specific/generated-looking)

### Fixture Naming
**Pattern:** camelCase, descriptive, with `Page` suffix

```typescript
test.extend<Fixtures>({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.open();
    await use(todoPage);
  },
  
  demoPageAuthenticated: async ({ page }, use) => {
    const demoPage = new DemoPage(page);
    await demoPage.openConfiguredStartPath();
    await demoPage.loginFromEnv();
    await demoPage.selectDealershipIfConfigured();
    await use(demoPage);
  },
});
```

---

## 6. Utilities & Helpers

### File Naming
**Pattern:** `<noun>.<type>.ts`

- Type options: `.util`, `.helper`, `.service`, `.config`
- Location: `src/utils/` or `src/helpers/`
- camelCase, descriptive

**Examples:**
- ✅ `browser.util.ts` — browser utilities
- ✅ `auth.helper.ts` — authentication helpers
- ✅ `wait.util.ts` — wait/polling utilities
- ✅ `dateFormat.util.ts` — date formatting
- ❌ `utils.ts` (too generic)
- ❌ `Helpers.ts` (PascalCase)

### Function Naming
**Pattern:** camelCase, verb-first

```typescript
export async function waitForElement(page: Page, selector: string, timeoutMs = 5000) { }
export function formatDate(date: Date, format: string) { }
export async function retryAsync<T>(fn: () => Promise<T>, maxAttempts: number) { }
```

---

## 7. Configuration Files

### File Naming
**Pattern:** Playwright standards

- `playwright.config.ts` — main config (do not rename)
- `tsconfig.json` — TypeScript config (do not rename)
- `.env` — environment variables (do not rename)
- `package.json` — dependencies (do not rename)

---

## 8. Directories

### Structure & Naming
**Pattern:** lowercase, plural for collections

```
demo/
├── src/
│   ├── locators/           # All locator factory files
│   ├── pages/              # All Page Objects
│   ├── testdata/           # All test data
│   └── utils/              # Utilities and helpers (if needed)
├── tests/
│   ├── fixtures/           # All fixtures
│   └── spec/               # All spec files
├── contract/               # Standards & documentation
└── playwright-report/      # Generated reports
```

### Directory Naming Rules
- Use **lowercase**
- Use **plural form** for collections (e.g., `pages`, `locators`, `specs`)
- Use **singular form** for specific features (e.g., `contract`, `fixtures`)
- Use **hyphens** for multi-word directories (e.g., `test-data`, `page-objects`)
- Avoid abbreviations (e.g., `spec` not `specs/` unless it's obviously plural)

---

## 9. Import/Export Conventions

### Named Exports
Always use **named exports** for clarity and tree-shaking:

```typescript
// ✅ Good
export class TodoPage extends BasePage { }
export const todoLocators = (page: Page) => ({ });
export const todoData: TodoDataRow[] = [];

// ❌ Avoid default exports
export default class TodoPage { }
```

### Import Paths
Use **relative paths** for same-package imports:

```typescript
// ✅ Good
import { BasePage } from './BasePage';
import { todoLocators } from '../locators/todoLocators';
import { TodoPage } from '../pages/TodoPage';

// ❌ Avoid absolute paths
import { BasePage } from '@src/pages/BasePage';
```

---

## 10. Variable Naming

### Local Variables
**Pattern:** camelCase

```typescript
const userName = 'John Doe';
const isVisible = await element.isVisible();
const userList = ['Alice', 'Bob', 'Charlie'];
```

### Constants
**Pattern:** UPPER_SNAKE_CASE

```typescript
const MAX_RETRIES = 3;
const DEFAULT_TIMEOUT = 5000;
const API_BASE_URL = 'https://api.example.com';
```

### Booleans
**Pattern:** `is<Adjective>` or `has<Noun>` or `can<Verb>`

```typescript
const isVisible = true;
const isEnabled = false;
const hasError = true;
const canSubmit = false;
```

---

## Summary Table

| File Type | Pattern | Location | Example |
|-----------|---------|----------|---------|
| Test Spec | `TC_<NNN>_<Desc>.spec.ts` | `tests/spec/` | `TC_001_Add_Todo.spec.ts` |
| Page Object | `<Feature>Page.ts` | `src/pages/` | `TodoPage.ts` |
| Locators | `<feature>Locators.ts` | `src/locators/` | `todoLocators.ts` |
| Test Data | `<flow>Data.ts` | `src/testdata/` | `todoData.ts` |
| Fixtures | `index.ts` | `tests/fixtures/` | `index.ts` |
| Utilities | `<noun>.<type>.ts` | `src/utils/` | `browser.util.ts` |

---

## Audit & Compliance

✅ **Current Compliance:**
- Spec files: `TC_NNN_Description.spec.ts` (COMPLIANT)
- Page Objects: `<Feature>Page.ts` in `src/pages/` (COMPLIANT)
- Test Data: `<flow>Data.ts` in `src/testdata/` (COMPLIANT)

⚠️ **Items to Review:**
- Locators: `<feature>Locators.ts` — currently uses camelCase ✅ (correct)
- Fixtures: `index.ts` — correct; old `service-stage-adp1connectcdkcom-d.fixture.ts` should be deleted
- No utilities layer yet — add if needed

---

## Enforcement

Apply these conventions:
1. **New files:** Follow the patterns above
2. **Refactoring:** Rename files during code cleanup to align with conventions
3. **Code review:** Verify naming before merge
4. **Consistency:** If breaking a convention, document the exception in this file

---

Last Updated: 2026-08-18
