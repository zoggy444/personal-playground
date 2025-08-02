import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

export const AUTH_FILE = 'playwright/.auth/user.json';

export default defineConfig({
  reporter: 'html',
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    // Setup project
    {
      name: 'auth',
      testDir: 'tests/auth',
      testMatch: /setup\.ts/,
    },
    {
      name: 'chromium',
      testDir: defineBddConfig({
        features: 'tests/*.feature',
        steps: 'tests/*.ts',
      }),
      use: {
        storageState: AUTH_FILE,
      },
      dependencies: ['auth'],
    },
  ],
});