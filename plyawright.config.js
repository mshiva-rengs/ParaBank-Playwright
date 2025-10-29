const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',          // folder where your tests live
  testMatch: '**/*.spec.js',
  timeout: 30 * 8000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  reporter: 'html',
  use: {
    headless: false,           // show browser (optional)
    actionTimeout: 0,
    trace: 'on-first-retry',
  },
});

