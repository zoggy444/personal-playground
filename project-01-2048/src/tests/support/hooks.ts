import {
    BeforeAll,
    Then,
    AfterAll,
  } from "@cucumber/cucumber";

import { Page, Browser, BrowserContext, chromium } from "@playwright/test";
import * as OTPAuth from "otpauth"

type Global = {
  browser: Browser;
  page: Page;
  browserContext: BrowserContext;
  newTile: {number?: number, position?: number[][]}[];
  board: number[][];
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

var global: Global = {
  browser: browser,
  page: page,
  browserContext: browserContext,
  newTile: [],
  board: [],
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
  try {
    hasExportedCredentials();
  } catch (error:any) {
    console.error("Error: " + error.message);
    throw error; // throw the error to stop the tests
  }

  await page.goto("https://cuddly-fishstick-5xg5qw7qjq6h4977-3000.app.github.dev/");
  await page.screenshot({ path: "src/tests/screenshots/hooks-before-all-1.png" })
  await page.waitForLoadState('domcontentloaded')
  await page.screenshot({ path: "src/tests/screenshots/hooks-before-all-2.png" })
  await page.getByLabel("Username or email address").click()
  await page
   .getByLabel("Username or email address")
   .fill(process.env.GITHUB_USER || '');
  await page.screenshot({ path: "src/tests/screenshots/hooks-before-all-3.png" })
  await page.getByLabel("Username or email address").press("Tab")
  await page.getByLabel("Password").fill(process.env.GITHUB_PASSWORD || '');
  await page.screenshot({ path: "src/tests/screenshots/hooks-before-all-4.png" })
  await page.getByRole("button", { name: "Sign in", "exact": true }).click()
  await page.screenshot({ path: "src/tests/screenshots/hooks-before-all-5.png" })
  await page.getByPlaceholder("XXXXXX").click()
  const otp = generateOTP(process.env.GITHUB_OTP || '');
  await page.getByPlaceholder("XXXXXX").fill(otp)
  await page.screenshot({ path: "src/tests/screenshots/hooks-before-all-6.png" })
  await page.waitForLoadState('load', {timeout: 20000});
  await page.screenshot({ path: "src/tests/screenshots/hooks-before-all-7.png" })
});

Then('the board should be', {timeout: 20 * 1000},  async function (dataTable) {
  const table = dataTable.raw();
  let board:number[][] = [];
  // I didn't manage to extract that part for some reason, so I repeat it in various steps
  for (let i=0; i < table.length; i++) {
    const row = table[i];
    board.push([]);
    for (let j=0; j < row.length; j++) {
      const cellSelector = `[id="${i}-${j}"]`;
      const expected = row[j].trim();
      const cell = page.locator(cellSelector);

      const actual = await cell.textContent() || '';
      let err = false;
      if (expected === '0') {
        if (actual !== '') {
          console.error(`Error in cell (${i}, ${j}): Expected empty, but found "${actual}"`);
          err = true;
        }else{
          board[i].push(0);
        }
      } else if (expected === '*') {
        if (['', '2', '4'].indexOf(actual) === -1) {
          err = true;
        }else{
          global.newTile.push({number: parseInt(actual), position: [[i, j]]});
          board[i].push(parseInt(actual));
        }
      } else {
        if (expected !== actual) {
          console.error(`Error in cell (${i}, ${j}): Expected "${expected}", but found "${actual}"`);
          err = true;
        }else{
          board[i].push(parseInt(actual));
        }
      }
      if (err) {
        console.error(`Error in cell (${i}, ${j}): Expected "${expected}", but found "${actual}"`);
        throw new Error(`Cell (${i}, ${j}) does not match expected value. Expected: "${expected}", Found: "${actual}"`);
      }
      global.board = board; // Update the global board state
    }
  }
});

// Cleanup after all tests
// This will close the browser and context after all tests are done
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
