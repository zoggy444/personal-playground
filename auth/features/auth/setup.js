"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// See: https://playwright.dev/docs/auth#basic-shared-account-in-all-tests
const test_1 = require("@playwright/test");
const playwright_config_1 = require("../../playwright.config");
console.log("imported");
const OTPAuth = __importStar(require("otpauth"));
console.log("setup config imported");
function generateOTP(secret) {
    const totp = new OTPAuth.TOTP({
        secret: secret,
        digits: 6,
        algorithm: "sha1",
        period: 30,
    });
    return totp.generate();
}
function hasExportedCredentials() {
    if (!process.env.GITHUB_USER) {
        throw new Error(`GITHUB_USER environment variable must be set. (type 'export GITHUB_USER="my_username"')`);
    }
    else if (!process.env.GITHUB_PASSWORD) {
        throw new Error(`GITHUB_PASSWORD environment variable must be set.. (type 'export GITHUB_PASSWORD="my_password"')`);
    }
    else if (!process.env.GITHUB_OTP) {
        throw new Error(`GITHUB_OTP environment variables must be set.. (type 'export GITHUB_OTP="my_otp"')`);
    }
}
(0, test_1.test)('authenticate', async ({ page }) => {
    console.log("authenticate");
    // go to codespace page and pass 2FA
    try {
        hasExportedCredentials();
    }
    catch (error) {
        console.error("Error: " + error.message);
        throw error; // throw the error to stop the tests
    }
    await page.goto('https://ominous-carnival-ppj9rx5rvpw376r4-5173.app.github.dev/');
    await page.screenshot({ path: "tests/screenshots/hooks-before-all-1.png" });
    await page.waitForLoadState('domcontentloaded');
    await page.screenshot({ path: "tests/screenshots/hooks-before-all-2.png" });
    await page.getByLabel("Username or email address").click();
    await page
        .getByLabel("Username or email address")
        .fill(process.env.GITHUB_USER || '');
    await page.screenshot({ path: "tests/screenshots/hooks-before-all-3.png" });
    await page.getByLabel("Username or email address").press("Tab");
    await page.getByLabel("Password").fill(process.env.GITHUB_PASSWORD || '');
    await page.screenshot({ path: "tests/screenshots/hooks-before-all-4.png" });
    await page.getByRole("button", { name: "Sign in", "exact": true }).click();
    await page.screenshot({ path: "tests/screenshots/hooks-before-all-5.png" });
    await page.getByPlaceholder("XXXXXX").click();
    const otp = generateOTP(process.env.GITHUB_OTP || '');
    await page.getByPlaceholder("XXXXXX").fill(otp);
    await page.screenshot({ path: "tests/screenshots/hooks-before-all-6.png" });
    await page.waitForLoadState('load', { timeout: 20000 });
    await page.screenshot({ path: "tests/screenshots/hooks-before-all-7.png" });
    await page.context().storageState({ path: playwright_config_1.AUTH_FILE });
});
