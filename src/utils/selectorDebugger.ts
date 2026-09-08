/**
 * Selector Debugger Utility
 * Helps identify correct element selectors for automation
 * Usage: Run with DEBUG_MODE=true to enable logging and screenshots
 */

import { Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export class SelectorDebugger {
  private page: Page;
  private debugMode: boolean;
  private screenshotCount: number = 0;

  constructor(page: Page, enableDebug: boolean = false) {
    this.page = page;
    this.debugMode = enableDebug || process.env.DEBUG_MODE === 'true';
  }

  /**
   * Log debug information if debug mode is enabled
   */
  async log(message: string, data?: any) {
    if (this.debugMode) {
      console.log(`[DEBUG] ${message}`, data ? JSON.stringify(data, null, 2) : '');
    }
  }

  /**
   * Take a screenshot for debugging (only if enabled)
   */
  async screenshot(filename: string) {
    if (!this.debugMode || process.env.CAPTURE_SCREENSHOTS === 'false') {
      return;
    }

    try {
      const screenshotDir = path.join(process.cwd(), 'test-results', 'screenshots');
      if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
      }

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filepath = path.join(screenshotDir, `${this.screenshotCount++}_${filename}_${timestamp}.png`);

      await this.page.screenshot({ path: filepath });
      await this.log(`Screenshot saved: ${filepath}`);
    } catch (error) {
      console.error(`Failed to take screenshot: ${filename}`, error);
    }
  }

  /**
   * Highlight an element on the page (useful for visual debugging)
   */
  async highlightElement(selector: string) {
    if (!this.debugMode) {
      return;
    }

    try {
      await this.page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (el) {
          (el as HTMLElement).style.outline = '3px solid red';
          (el as HTMLElement).style.backgroundColor = 'rgba(255,0,0,0.1)';
        }
      }, selector);

      await this.page.waitForTimeout(1000);

      await this.page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (el) {
          (el as HTMLElement).style.outline = '';
          (el as HTMLElement).style.backgroundColor = '';
        }
      }, selector);
    } catch (error) {
      console.warn(`Failed to highlight element: ${selector}`, error);
    }
  }

  /**
   * Find all elements matching common patterns and log their attributes
   */
  async findElementsByPattern(pattern: string) {
    const results = await this.page.evaluate((pat) => {
      const elements = Array.from(document.querySelectorAll('*'));
      return elements
        .filter((el) => {
          const text = el.textContent?.toLowerCase() || '';
          const id = (el.id || '').toLowerCase();
          const name = (el.getAttribute('name') || '').toLowerCase();
          const placeholder = (el.getAttribute('placeholder') || '').toLowerCase();
          const ariaLabel = (el.getAttribute('aria-label') || '').toLowerCase();

          return (
            text.includes(pat.toLowerCase()) ||
            id.includes(pat.toLowerCase()) ||
            name.includes(pat.toLowerCase()) ||
            placeholder.includes(pat.toLowerCase()) ||
            ariaLabel.includes(pat.toLowerCase())
          );
        })
        .slice(0, 10) // Limit results
        .map((el) => ({
          tagName: el.tagName,
          id: el.id,
          name: el.getAttribute('name'),
          type: el.getAttribute('type'),
          placeholder: el.getAttribute('placeholder'),
          ariaLabel: el.getAttribute('aria-label'),
          class: el.className,
          text: el.textContent?.slice(0, 50),
          xpath: getXPath(el),
        }));

      function getXPath(element: Element): string {
        if (element.id) {
          return `id("${element.id}")`;
        }
        if (element === document.body) {
          return element.tagName.toLowerCase();
        }

        const index = (el: Element): number => {
          let count = 0;
          let sibling = el.previousElementSibling;
          while (sibling) {
            if (sibling.tagName.toLowerCase() === el.tagName.toLowerCase()) {
              count++;
            }
            sibling = sibling.previousElementSibling;
          }
          return count + 1;
        };

        const tagName = element.tagName.toLowerCase();
        const parent = element.parentElement;
        return parent ? `${getXPath(parent)}/${tagName}[${index(element)}]` : `/${tagName}`;
      }
    }, pattern);

    await this.log(`Found ${results.length} elements matching pattern: "${pattern}"`, results);
    return results;
  }

  /**
   * Get all form inputs on the page with their attributes
   */
  async getAllFormInputs() {
    const inputs = await this.page.evaluate(() => {
      return Array.from(document.querySelectorAll('input, select, textarea, button'))
        .map((el) => {
          const name = el.getAttribute('name');
          const id = el.id;
          const tagName = el.tagName.toLowerCase();
          
          // Build best available selector
          let selector = '';
          if (id) {
            selector = `#${id}`;
          } else if (name) {
            selector = `${tagName}[name="${name}"]`;
          } else {
            selector = tagName;
          }

          return {
            tagName,
            type: (el as any).type,
            name,
            id,
            placeholder: el.getAttribute('placeholder'),
            ariaLabel: el.getAttribute('aria-label'),
            value: (el as any).value,
            text: el.textContent?.slice(0, 30),
            selector,
          };
        })
        .filter((input) => input.name || input.id || input.placeholder);
    });

    await this.log('All form inputs on page', inputs);
    return inputs;
  }

  /**
   * Wait for element and log its details when found
   */
  async waitAndLogElement(selector: string, timeout: number = 5000) {
    try {
      await this.page.waitForSelector(selector, { timeout });
      const element = await this.page.evaluate((sel) => {
        const el = document.querySelector(sel);
        return {
          exists: !!el,
          visible: el ? (el as HTMLElement).offsetHeight > 0 : false,
          text: el?.textContent?.slice(0, 50),
          attributes: el
            ? Object.keys(el.attributes).reduce(
                (acc, key) => {
                  const attr = el.attributes[key];
                  acc[attr.name] = attr.value;
                  return acc;
                },
                {} as Record<string, string>
              )
            : {},
        };
      }, selector);

      await this.log(`Element found: ${selector}`, element);
      return element;
    } catch (error) {
      await this.log(`Element NOT found: ${selector}`, { error: (error as Error).message });
      throw error;
    }
  }

  /**
   * Enable Playwright Inspector for interactive debugging
   */
  async enableInteractiveDebug() {
    console.log('\n🔍 INTERACTIVE DEBUG MODE ENABLED');
    console.log('Playwright Inspector will open. Use it to identify selectors.');
    console.log('Close the inspector when done.\n');

    // This will be paused, allowing you to inspect elements
    await this.page.pause();
  }
}
