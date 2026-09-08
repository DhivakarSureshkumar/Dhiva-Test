/**
 * Debug Script: Find Element Selectors for CRM Automation
 * 
 * Usage:
 *   npm run debug:selectors -- --page login
 *   npm run debug:selectors -- --page prospect
 *   npm run debug:selectors -- --page credit-report
 * 
 * Or run directly:
 *   npx ts-node scripts/findSelectors.ts --page login
 */

import { chromium } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const config = {
  loginUrl: process.env.STAGING_URL || 'https://stagingnext.eleadcrm.com',
  username: process.env.CRM_USERNAME || 'duraipam',
  password: process.env.CRM_PASSWORD || 'test321',
  dealership: process.env.CRM_DEALERSHIP || 'Southeast Motors',
};

async function findLoginSelectors() {
  console.log('\n🔍 Finding Login Page Selectors...\n');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto(`${config.loginUrl}/evo2/fresh/login.asp`);
    console.log('✅ Login page loaded');
    console.log('📍 Inspect the elements below and copy the selectors:\n');

    // Find all input fields
    const inputs = await page.locator('input').all();
    console.log(`Found ${inputs.count} input fields:`);

    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      const type = await input.getAttribute('type');
      const name = await input.getAttribute('name');
      const id = await input.getAttribute('id');
      const placeholder = await input.getAttribute('placeholder');

      console.log(`\n  Input #${i + 1}:`);
      console.log(`    Type: ${type}`);
      console.log(`    Name: ${name}`);
      console.log(`    ID: ${id}`);
      console.log(`    Placeholder: ${placeholder}`);
      if (name) console.log(`    Selector: input[name="${name}"]`);
      if (id) console.log(`    Selector: input[id="${id}"]`);
    }

    // Find all buttons
    const buttons = await page.locator('button').all();
    console.log(`\n\nFound ${buttons.length} buttons:`);

    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];
      const text = await button.textContent();
      const id = await button.getAttribute('id');
      const name = await button.getAttribute('name');
      const type = await button.getAttribute('type');

      console.log(`\n  Button #${i + 1}: "${text?.trim()}"`);
      console.log(`    Type: ${type}`);
      console.log(`    Name: ${name}`);
      console.log(`    ID: ${id}`);
    }

    console.log('\n\n💡 Tips:');
    console.log('1. Use browser DevTools (F12) to inspect elements');
    console.log('2. Right-click element → Copy CSS selector');
    console.log('3. Update the selectors in src/locators/crmLoginLocators.ts');
    console.log('\n⏸️  Browser window stays open for manual inspection');
    console.log('   Close it when done.\n');

    // Keep browser open for manual inspection
    await page.pause();
  } finally {
    await browser.close();
  }
}

async function findProspectSelectors() {
  console.log('\n🔍 Finding Prospect Form Page Selectors...\n');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    // This would require logging in first
    console.log('ℹ️  To find prospect form selectors:');
    console.log('1. Login to the CRM');
    console.log('2. Navigate to Add Prospect');
    console.log('3. Open Developer Tools (F12)');
    console.log('4. Inspect each form field and copy selector');
    console.log('\nFields to find:');
    console.log('  - First Name input');
    console.log('  - Last Name input');
    console.log('  - Email input');
    console.log('  - Zip Code input');
    console.log('  - Primary Employee dropdown');
    console.log('  - Source dropdown');
    console.log('  - Type dropdown');
    console.log('  - Comments textarea');
    console.log('  - Save button');

    // The actual implementation would require completing login flow
    // For now, provide instructions
  } finally {
    await browser.close();
  }
}

async function findCreditReportSelectors() {
  console.log('\n🔍 Finding Credit Report Page Selectors...\n');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    console.log('ℹ️  To find credit report form selectors:');
    console.log('1. Login to the CRM');
    console.log('2. Create a prospect (or navigate to existing one)');
    console.log('3. Navigate to credit report request page');
    console.log('4. Open Developer Tools (F12)');
    console.log('5. Inspect each field and copy selector');
    console.log('\nFields to find:');
    console.log('  - SSN input');
    console.log('  - Birthday input');
    console.log('  - TransUnion checkbox');
    console.log('  - Equifax checkbox');
    console.log('  - Experian checkbox');
    console.log('  - Request Credit Report button');
  } finally {
    await browser.close();
  }
}

async function main() {
  const args = process.argv.slice(2);
  const pageType = args.find((arg) => arg.startsWith('--page'))?.split('=')[1];

  console.log('╔════════════════════════════════════════════════╗');
  console.log('║  CRM Automation - Selector Finder              ║');
  console.log('║  Helps identify correct CSS selectors          ║');
  console.log('╚════════════════════════════════════════════════╝');

  console.log(`\nConfiguration:`);
  console.log(`  URL: ${config.loginUrl}`);
  console.log(`  Username: ${config.username}`);
  console.log(`  Dealership: ${config.dealership}`);

  switch (pageType) {
    case 'login':
      await findLoginSelectors();
      break;
    case 'prospect':
      await findProspectSelectors();
      break;
    case 'credit-report':
      await findCreditReportSelectors();
      break;
    default:
      console.log('\nUsage: npm run debug:selectors -- --page [login|prospect|credit-report]');
      console.log('\nExample:');
      console.log('  npm run debug:selectors -- --page login');
      process.exit(1);
  }
}

main().catch(console.error);
