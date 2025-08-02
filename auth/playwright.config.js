"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTH_FILE = void 0;
const test_1 = require("@playwright/test");
const playwright_bdd_1 = require("playwright-bdd");
exports.AUTH_FILE = 'playwright/.auth/user.json';
exports.default = (0, test_1.defineConfig)({
    projects: [
        {
            name: 'auth',
            testDir: 'features/auth',
            testMatch: /setup\.ts/,
        },
        {
            name: 'chromium',
            testDir: (0, playwright_bdd_1.defineBddConfig)({
                features: 'features/*.feature',
                steps: 'features/steps/*.ts',
            }),
            use: {
                storageState: exports.AUTH_FILE,
            },
            dependencies: ['auth'],
        },
    ],
});
