# Page Object Model (POM) Framework Structure

## Directory Layout

```
demo/
├── src/
│   ├── pages/              # Page Object classes
│   │   ├── BasePage.ts     # Base page class with common methods
│   │   └── index.ts        # Page objects export
│   │
│   ├── locators/           # Element locators and selectors
│   │   └── index.ts        # Locators export
│   │
│   ├── fixtures/           # Shared fixtures and setup
│   │   └── index.ts        # Fixtures export
│   │
│   ├── utils/              # Utility functions and helpers
│   │   └── index.ts        # Utils export
│   │
│   ├── testdata/           # Test data and constants
│   │   └── index.ts        # Test data export
│   │
│   └── config/             # Configuration files
│       └── index.ts        # Config export
│
├── tests/
│   ├── spec/               # Test specification files
│   │   └── *.spec.ts       # Test cases
│   │
│   └── fixtures/           # Test fixtures
│       └── index.ts        # Fixtures setup
│
├── playwright.config.ts    # Playwright configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # NPM dependencies
```

## Usage Guidelines

### 1. Page Objects (`src/pages/`)
- Create one page object per page/component
- Extend from `BasePage`
- Define page-specific locators and actions
- Example: `HomePage.ts`, `LoginPage.ts`

### 2. Locators (`src/locators/`)
- Store all element selectors in separate files
- Organize by page or feature
- Example: `homePageLocators.ts`, `loginPageLocators.ts`

### 3. Fixtures (`src/fixtures/` and `tests/fixtures/`)
- `src/fixtures/`: Reusable fixtures for multiple tests
- `tests/fixtures/index.ts`: Custom test fixtures and setup/teardown

### 4. Utils (`src/utils/`)
- Common helper functions
- Utilities for data manipulation, validation, etc.

### 5. Test Data (`src/testdata/`)
- Test datasets and constants
- Environment-specific data
- Mock data for testing

### 6. Config (`src/config/`)
- Application configuration
- Environment variables
- Test settings

### 7. Tests (`tests/spec/`)
- Test specifications using the POM
- Organized by feature or page
- Example: `login.spec.ts`, `checkout.spec.ts`

## Best Practices

✅ **DO:**
- Keep page objects focused on a single page
- Use descriptive names for methods and locators
- Separate locators from actions
- Use fixtures for common setup/teardown
- Follow the DRY principle

❌ **DON'T:**
- Hard-code selectors in test files
- Create overly complex page objects
- Mix multiple pages in one object
- Duplicate code across page objects

## Getting Started

1. Create page object files in `src/pages/`
2. Define locators in `src/locators/`
3. Add utility functions to `src/utils/`
4. Create test data in `src/testdata/`
5. Write tests in `tests/spec/` using the POM
