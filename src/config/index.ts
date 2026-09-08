/**
 * Configuration file for CRM automation
 * Environment variables are loaded from .env file
 */

export const config = {
  // Base URLs for different environments
  urls: {
    staging: process.env.STAGING_URL || 'https://stagingnext.eleadcrm.com',
    qa: process.env.QA_URL || 'https://qa.eleadcrm.com',
    production: process.env.PROD_URL || 'https://www.eleadcrm.com',
  },

  // Credentials (should be in .env file, NOT committed to git)
  credentials: {
    username: process.env.CRM_USERNAME || 'duraipam',
    password: process.env.CRM_PASSWORD || 'test321',
    dealership: process.env.CRM_DEALERSHIP || 'Southeast Motors',
  },

  // Test data
  testData: {
    firstName: process.env.TEST_FIRST_NAME || 'TestFirst',
    lastName: process.env.TEST_LAST_NAME || 'TestLast',
    email: process.env.TEST_EMAIL || 'test@example.com',
    zip: process.env.TEST_ZIP || '10008',
    ssn: process.env.TEST_SSN || '555123456',
    birthday: process.env.TEST_BIRTHDAY || '26/11/2025',
  },

  // Timeouts
  timeouts: {
    short: 3000,
    medium: 5000,
    long: 10000,
    navigation: 15000,
  },

  // Feature flags
  features: {
    debugMode: process.env.DEBUG_MODE === 'true',
    captureScreenshots: process.env.CAPTURE_SCREENSHOTS !== 'false',
    slowMo: process.env.SLOW_MO ? parseInt(process.env.SLOW_MO) : 0,
  },
};

export default config;
