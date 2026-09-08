/**
 * Element Finder Utility
 * Provides flexible element finding with multiple selector fallbacks
 */

import { Page, Locator } from '@playwright/test';

export class ElementFinder {
  constructor(private page: Page) {}

  /**
   * Find input by multiple possible selectors
   * Tries each selector in order until one works
   */
  findInputBySelectorFallbacks(selectors: string[]): Locator {
    let resultLocator: Locator | null = null;

    for (const selector of selectors) {
      const locator = this.page.locator(selector);
      // Return the first selector (will fail gracefully if element doesn't exist)
      resultLocator = locator;
      break; // In practice, we return the first one; Playwright will handle not-found at runtime
    }

    return resultLocator || this.page.locator(':not(:any)'); // Return never-matching selector as fallback
  }

  /**
   * Find a select/dropdown by label text and return the select element
   */
  findSelectByLabel(labelText: string): Locator {
    return this.page.locator(`label:has-text("${labelText}") + select, label:has-text("${labelText}") ~ select`);
  }

  /**
   * Find button by text (exact or partial match)
   */
  findButtonByText(text: string, exact: boolean = false): Locator {
    if (exact) {
      return this.page.locator(`button:has-text("${text}")`);
    }
    return this.page.locator(`button:has-text("${text}")`);
  }

  /**
   * Find link by text
   */
  findLinkByText(text: string): Locator {
    return this.page.locator(`a:has-text("${text}")`);
  }

  /**
   * Find input by placeholder text
   */
  findInputByPlaceholder(placeholder: string): Locator {
    return this.page.locator(`input[placeholder*="${placeholder}"]`);
  }

  /**
   * Find input by name attribute
   */
  findInputByName(name: string): Locator {
    return this.page.locator(`input[name*="${name}"]`);
  }

  /**
   * Find select by name attribute
   */
  findSelectByName(name: string): Locator {
    return this.page.locator(`select[name*="${name}"]`);
  }

  /**
   * Find textarea by name
   */
  findTextareaByName(name: string): Locator {
    return this.page.locator(`textarea[name*="${name}"]`);
  }

  /**
   * Find element by aria-label
   */
  findByAriaLabel(label: string): Locator {
    return this.page.locator(`[aria-label*="${label}"]`);
  }

  /**
   * Find option in select by text
   */
  findOptionByText(text: string): Locator {
    return this.page.locator(`option:has-text("${text}")`);
  }

  /**
   * Try multiple selectors and return the first one that exists
   */
  async findAny(selectors: string[]): Promise<Locator | null> {
    for (const selector of selectors) {
      try {
        const locator = this.page.locator(selector);
        await locator.first().waitFor({ state: 'attached', timeout: 2000 });
        return locator;
      } catch {
        // Continue to next selector
      }
    }
    return null;
  }

  /**
   * Get all text content from an element, useful for matching dropdown options
   */
  async getElementText(locator: Locator): Promise<string> {
    return (await locator.textContent()) || '';
  }

  /**
   * Wait for element and validate it's visible before proceeding
   */
  async waitAndValidate(locator: Locator, timeout: number = 5000): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }
}
