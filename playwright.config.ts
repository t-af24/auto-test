import { defineConfig, devices } from '@playwright/test';
import * as fs from 'fs';

const storageStatePath = 'test-results/storageState.json';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, // Always use 1 worker to prevent multiple browser windows
  // Global timeout and browser settings
  globalTimeout: 600000, // 10 minutes
  timeout: 30000,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }]
  ],
  // Ensure single browser instance
  use: {
    baseURL: 'https://web.akiflow.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: false, // Ensure headed browser for visual validation
    ...(fs.existsSync(storageStatePath) ? { storageState: storageStatePath } : {}),
    // Increase timeouts for dashboard loading and popup handling
    actionTimeout: 30000,
    navigationTimeout: 30000,
  },
  // Ensure single browser instance with proper context management
  projects: [
    { 
      name: 'chromium', 
      use: { 
        ...devices['Desktop Chrome'],
        // Ensure proper browser context management
        launchOptions: {
          // Removed --single-process which was causing context issues
        }
      } 
    },
    { 
      name: 'msedge', 
      use: { 
        channel: 'msedge',
        launchOptions: {
          // Removed --single-process which was causing context issues
        }
      } 
    },
    { 
      name: 'webkit', 
      use: { 
        ...devices['Desktop Safari'],
        launchOptions: {
          // Removed --single-process which was causing context issues
        }
      } 
    },
  ],
  outputDir: 'test-results/',
  globalSetup: './global-setup.ts',
  globalTeardown: './global-teardown.ts',
});
