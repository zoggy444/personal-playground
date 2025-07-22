import { test as base, createBdd } from 'playwright-bdd';
import * as OTPAuth from "otpauth"

type Fixtures = {
  // set types of your fixtures
};

function generateOTP(secret: string) {
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
  } else if (!process.env.GITHUB_PASSWORD) {
    throw new Error(`GITHUB_PASSWORD environment variable must be set.. (type 'export GITHUB_PASSWORD="my_password"')`);  
  } else if (!process.env.GITHUB_OTP) {
    throw new Error(`GITHUB_OTP environment variables must be set.. (type 'export GITHUB_OTP="my_otp"')`);
  }
}

export const test = base.extend<Fixtures>({
  page: async ({ page }, use) => {
    // go to codespace page and pass 2FA
    try {
      hasExportedCredentials();
    } catch (error:any) {
      console.error("Error: " + error.message);
      throw error; // throw the error to stop the tests
    }

    await page.goto('https://ominous-carnival-ppj9rx5rvpw376r4-5173.app.github.dev/');

    await page.screenshot({ path: "tests/screenshots/hooks-before-all-1.png" })
    await page.waitForLoadState('domcontentloaded')
    await page.screenshot({ path: "tests/screenshots/hooks-before-all-2.png" })
    await page.getByLabel("Username or email address").click()
    await page
    .getByLabel("Username or email address")
    .fill(process.env.GITHUB_USER || '');
    await page.screenshot({ path: "tests/screenshots/hooks-before-all-3.png" })
    await page.getByLabel("Username or email address").press("Tab")
    await page.getByLabel("Password").fill(process.env.GITHUB_PASSWORD || '');
    await page.screenshot({ path: "tests/screenshots/hooks-before-all-4.png" })
    await page.getByRole("button", { name: "Sign in", "exact": true }).click()
    await page.screenshot({ path: "tests/screenshots/hooks-before-all-5.png" })
    await page.getByPlaceholder("XXXXXX").click()
    const otp = generateOTP(process.env.GITHUB_OTP || '');
    await page.getByPlaceholder("XXXXXX").fill(otp)
    await page.screenshot({ path: "tests/screenshots/hooks-before-all-6.png" })
    await page.waitForLoadState('load', {timeout: 20000});
    await page.screenshot({ path: "tests/screenshots/hooks-before-all-7.png" })

    await use(page);
  },
});

export const { Given, When, Then } = createBdd(test);