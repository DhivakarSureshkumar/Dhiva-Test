# Valid Test Cases — File Association Audit

**Updated:** 2026-08-19 — TC_001 removed, framework reduced to 2 mature test cases

## Active Test Cases

### TC_002: Send and Validate RO Message ✅
**Spec File:** `tests/spec/SendRoMessage.spec.ts`
**Associated Files:**
- Page Object: `src/pages/ServiceMessagingPage.ts`
- Locators: `src/locators/serviceMessagingLocators.ts`
- Test Data: `src/testdata/serviceMessageData.ts`
- Fixture: `serviceMessagingPageAuthenticated` in `tests/fixtures/index.ts`

**Status:** ✅ VALID — All dependencies present and functional

---

### TC_004: Prospect Creation & Credit Report ✅
**Spec File:** `tests/spec/ProspectCredit.spec.ts`
**Associated Files:**
- Page Object: `src/pages/ProspectCreditPage.ts`
- Locators: `src/locators/prospectCreditLocators.ts`
- Test Data: `src/testdata/prospectCreditData.ts`
- Fixture: `prospectCreditPageAuthenticated` in `tests/fixtures/index.ts`

**Status:** ✅ VALID — All dependencies present and functional

---

## Shared/Base Files ✅

| File | Purpose | Used By |
|------|---------|---------|
| `src/pages/BasePage.ts` | Base class for all page objects | DemoPage, ServiceMessagingPage |
| `tests/fixtures/index.ts` | Fixture definitions | All test specs |
| `playwright.config.ts` | Configuration | Framework |
| `tsconfig.json` | TypeScript config | Framework |
| `package.json` | Dependencies | Framework |
| `.env` | Environment variables | Framework |

---

## Files Summary

### ✅ Files to Keep (All Valid & In Use)

**Page Objects (3):**
- ✅ `BasePage.ts` — Base class
- ✅ `ServiceMessagingPage.ts` — TC_002
- ✅ `ProspectCreditPage.ts` — TC_004

**Locators (2):**
- ✅ `serviceMessagingLocators.ts` — TC_002
- ✅ `prospectCreditLocators.ts` — TC_004

**Test Data (2):**
- ✅ `prospectCreditData.ts` — TC_004
- ✅ `serviceMessageData.ts` — TC_002

**Specs (2):**
- ✅ `SendRoMessage.spec.ts` — Active (TC-002)
- ✅ `ProspectCredit.spec.ts` — Active (TC-004)

**Fixtures (1):**
- ✅ `tests/fixtures/index.ts` — All specs

**Configuration (5):**
- ✅ `playwright.config.ts`
- ✅ `tsconfig.json`
- ✅ `package.json`
- ✅ `.env`
- ✅ `.env.example`

### ❌ Files Removed

**TC_001 Removal (Final Rationalization):**
- ❌ `tests/spec/TC_001_Add_Todo.spec.ts` — Simple test (no auth, hardcoded data)
- ❌ `src/pages/TodoPage.ts` — Dedicated page object
- ❌ `src/locators/todoLocators.ts` — Dedicated locators
- ❌ `todoPage` fixture — Removed from `tests/fixtures/index.ts`

**File Renaming (TC_004 Refactoring for Clarity):**
- ❌ `tests/spec/TC_004_Demo.spec.ts` → ✅ `ProspectCredit.spec.ts`
- ❌ `src/pages/DemoPage.ts` → ✅ `ProspectCreditPage.ts`
- ❌ `src/locators/demoLocators.ts` → ✅ `prospectCreditLocators.ts`
- ❌ `src/testdata/demoData.ts` → ✅ `prospectCreditData.ts`

**TC_ Prefix Removal (Cleaner Naming):**
- ❌ `tests/spec/TC_002_Send_RO_Message.spec.ts` → ✅ `SendRoMessage.spec.ts`
- ❌ `tests/spec/TC_004_ProspectCredit.spec.ts` → ✅ `ProspectCredit.spec.ts`

---

## Cleanup Verification

✅ **Duplicate Folders (Root Level):** None found
- ❌ `/locators/` — REMOVED
- ❌ `/pages/` — REMOVED
- ❌ `/testdata/` — REMOVED
- ✅ No other duplicates detected

✅ **Unused Files:** None found
- All .ts files in `src/` are actively used
- All test data files are actively used
- All spec files are active

✅ **Framework Structure:** Clean
- No stray files in root `src/`
- No duplicate fixtures
- No unused page objects
- No unused locators

---

## Test Count Verification

**Active Tests:** 8 total
- TC_001: 1 test (1 browser × 1 variant)
- TC_002: 2 tests (1 browser × 2 data rows)
- TC_004: 1 test (1 browser × 1 data row)

**Across 2 Browsers:** 8 tests total (Chromium + Firefox)

---

## Recommendation

✅ **Framework is clean and ready for production.** All files are properly associated with active test cases. No cleanup needed.

---

**Last Updated:** 2026-08-18
