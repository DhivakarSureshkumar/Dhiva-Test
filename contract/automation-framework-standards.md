# automation-framework-standards.md (demo edition)

> **Reference contract, not a prompt.** The suite prompts read this file. This is a simplified, single-environment version for the demo workspace; your full enterprise standard is separate.

Stack: plain Playwright Test + TypeScript. One environment, configured by `.env` (`BASE_URL`, and credentials if the flow needs login).

## Layering (firm)

1. **Specs call Page Object methods only.** No `getByRole`, `getByText`, or `page.locator` in the spec body. The only exception is a highlighter call.
2. **Page Objects** (`src/pages/<Feature>Page.ts`) own their locators and expose action + assertion methods. They extend `BasePage`.
3. **Locators** live in `src/locators/<feature>Locators.ts`, never in specs.

## Naming

- Spec file: `TC_<NNN>_<Description>.spec.ts` (example: `TC_002_Update_Record.spec.ts`).
- describe title: `TC-<NNN>: <Human Title>` (example: `TC-002: Update Record`).
- Page Object class: `<Feature>Page` (PascalCase); filename matches.

## Spec lifecycle

- Declare the Page Object with `let` at `describe` scope and instantiate it in `beforeEach` after the page exists.
- Import `test` and `expect` from `@playwright/test`.

## Hard rules (firm)

- **No `waitForTimeout`.** Smart waits only (`expect(locator).toBeVisible()`, `waitForLoadState`). The only exception is inside `BasePage.highlight`.
- **No inline credentials.** Read them from `process.env` inside a Page Object, never in a spec.
- **No hardcoded URLs in specs.** Use `page.goto('/path')`; `baseURL` comes from config.
- **Every test asserts something concrete.** No `expect(true).toBeTruthy()`.
- **Locator priority:** `getByRole`, `getByLabel`, `getByText`, CSS, then XPath last. Capture real locators via Playwright MCP; never guess.

## Data-driven tests

- Put variations in `src/testdata/<flow>Data.ts` as a typed array and iterate with a `for...of` loop inside the `describe`.

## Definition of Done (run for every new or changed spec)

1. **Type-check:** `npm run type-check`.
2. **Discovery:** `npm run list` shows the new spec.
3. **Selector-leakage scan:** no raw locators in the spec body (except the highlighter call).
4. **Hygiene scan:** no `waitForTimeout`, no inline credentials, no hardcoded URLs, no unconditional assertions.
5. **Targeted run:** run only the new spec once (`npx playwright test tests/spec/<file> --headed`) and report the real outcome.

## Scope control

- Implement only the requested scope. Do not edit `playwright.config.ts`.
- Reuse the existing Page Objects, locators, and `BasePage` first. Create new files only when the needed piece does not exist. Match the style of `TC_001` exactly.
