import {
    BeforeAll,
    AfterAll,
  } from "@cucumber/cucumber";

import { Page, Browser, BrowserContext, chromium, expect } from "@playwright/test";
import * as OTPAuth from "otpauth"

type Global = {
  browser: Browser;
  page: Page;
  browserContext: BrowserContext;
  isBoardCorrect: (expd: string[][], p: Page) => void;
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

var browser: Browser = await chromium.launch();
var browserContext: BrowserContext = await browser.newContext({ recordVideo: { dir: 'src/tests/videos/' } });
var page: Page = await browser.newPage({ recordVideo: { dir: 'src/tests/videos/' } });

async function isBoardCorrect(expected: string[][], page: Page) {
  // Vérifie si le tableau de jeu est correct
  for (let i=0; i < expected.length; i++) {
    const row = expected[i];
    for (let j=0; j < row.length; j++) {
      const cellSelector = `[id="${i}-${j}"]`;
      const cellValue = row[j].trim();
      const cell = page.locator(cellSelector);

      await cell.count();
      let expectedText;
      if (cellValue === '0') {
        expectedText = '';
      } else if (cellValue === '*') {
        expectedText = /|2|4/;
      } else {
        expectedText = cellValue;
      }
      await expect(cell).toHaveText(expectedText, { timeout: 5000 })
      .catch((error) => {
        console.error(`Error in cell (${i}, ${j}): Expected "${expectedText}", but found "${cell.textContent()}"`);
        throw error; // Rejette l'erreur pour arrêter l'exécution des tests
      });
    }
  }
}

var global: Global = {
  browser: browser,
  page: page,
  browserContext: browserContext,
  isBoardCorrect: isBoardCorrect,
};

function hasExportedCredentials() {
  if (!process.env.GITHUB_USER) {
    throw new Error("GITHUB_USER environment variable must be set.");
  } else if (!process.env.GITHUB_PASSWORD) {
    throw new Error("GITHUB_PASSWORD environment variable must be set.");  
  } else if (!process.env.GITHUB_OTP) {
    throw new Error("GITHUB_OTP environment variables must be set.");
  }
}

BeforeAll( {timeout: 20 * 1000}, async function () {
  console.log("BeforeAll hook: Initializing browser and page");
  try {
    hasExportedCredentials();
  } catch (error:any) {
    console.error("Error: " + error.message);
    throw error; // Rejette l'erreur pour arrêter l'exécution des tests
  }

  //await page.goto("https://github.com/")
  await page.goto("https://potential-barnacle-rp4wgj5gv9wfppg-3000.app.github.dev/");
  await page.screenshot({ path: "src/tests/screenshots/before-1.png" })
  await page.waitForLoadState('domcontentloaded')
  await page.screenshot({ path: "src/tests/screenshots/before-2.png" })
  //await page.getByRole("link", { name: "Sign in" }).click()
  await page.getByLabel("Username or email address").click()
  await page
   .getByLabel("Username or email address")
   .fill(process.env.GITHUB_USER)
  await page.screenshot({ path: "src/tests/screenshots/before-3.png" })
  await page.getByLabel("Username or email address").press("Tab")
  await page.getByLabel("Password").fill(process.env.GITHUB_PASSWORD)
  await page.screenshot({ path: "src/tests/screenshots/before-4.png" })
  await page.getByRole("button", { name: "Sign in", "exact": true }).click()
  await page.getByPlaceholder("XXXXXX").click()
  await page.screenshot({ path: "src/tests/screenshots/before-5.png" })
  const otp = generateOTP(process.env.GITHUB_OTP);
  console.log("Generated OTP: " + otp);
  await page.getByPlaceholder("XXXXXX").fill(otp)
  await page.screenshot({ path: "src/tests/screenshots/before-6.png" })
  await page.waitForLoadState('load', {timeout: 20000});
  await page.screenshot({ path: "src/tests/screenshots/before-7.png" })
  //await expect(page).toHaveURL("https://github.com")
  //await expect(page).toHaveURL("https://potential-barnacle-rp4wgj5gv9wfppg-3000.app.github.dev/")

  //await page.goto("https://potential-barnacle-rp4wgj5gv9wfppg-3000.app.github.dev/");
  //console.log(page.url());
  //console.log(await page.content());
});

// Ferme le navigateur une fois tous les scénarios joués
AfterAll(async function () {
  let browser = global.browser;
  let browserContext = global.browserContext;
  if (browserContext) {
    await browserContext.close();
  }
  if (browser) {
    await browser.close();
  }
});

export default global;
