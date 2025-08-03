import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
export const AUTH_FILE = 'playwright/.auth/user.json';

export default defineConfig({
  projects: [
    {
      name: 'auth',
      testDir: 'features/auth',
      testMatch: /setup\.ts/,
    },
    {
      name: 'chromium',
      testDir: defineBddConfig({
        features: 'features/*.feature',
        steps: 'features/steps/*.ts',
      }),
      use: {
        storageState: AUTH_FILE,
      },
      dependencies: ['auth'],
    },
  ],
});
