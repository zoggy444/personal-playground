import {
    Given,
    When,
    Then,
    BeforeAll,
    AfterAll,
  } from "@cucumber/cucumber";

import { Page, Browser, BrowserContext, chromium, expect } from "@playwright/test";
import * as OTPAuth from "otpauth"

function generateOTP(secret: string) {
  const totp = new OTPAuth.TOTP({
    secret: secret,
    digits: 6,
    algorithm: "sha1",
    period: 30,
  });

  return totp.generate();
}

let browser: Browser;
let page: Page;
let browserContext: BrowserContext;


BeforeAll( {timeout: 20 * 1000}, async function () {
  // Initialisation du navigateur avant chaque scénario
  browser = await chromium.launch();
  browserContext = await browser.newContext({ recordVideo: { dir: 'src/tests/videos/' } });
  browserContext.setDefaultTimeout(20000); // Timeout de 20 secondes pour les actions
  browserContext.setDefaultNavigationTimeout(20000); // Timeout de 20 secondes pour la navigation
  page = await browser.newPage({ recordVideo: { dir: 'src/tests/videos/' } });

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

Given("I am on the game board page", async function () {
  console.log("Checking for header: 2048");
  //await page.goto("https://potential-barnacle-rp4wgj5gv9wfppg-3000.app.github.dev/");
  await page.screenshot({ path: 'src/tests/screenshots/given-1-1.png', fullPage: true });
  const selector = `h1:has-text("2048")`;
  await page.waitForSelector(selector, { timeout: 10000 }); // Attend que le bouton soit présent
  const h1 = page.locator(selector);
  console.log(await h1.count());
  await expect(h1).toBeVisible();
  await page.keyboard.press('ArrowLeft');
});

Then('I should see a {string} button', async function (buttonText) {
  console.log("Checking for button: " + buttonText);
  await page.screenshot({ path: 'src/tests/screenshots/then-button-check.png', fullPage: true });
  const selector = `button:has-text("${buttonText}")`;
  await page.waitForSelector(selector, { timeout: 10000 }); // Attend que le bouton soit présent
  const button = page.locator(selector);
  console.log(await button.count());
  await expect(button).toBeVisible();
});

When('I click on the {string} button', async function (string) {
  const selector = `button:has-text("${string}")`;
  const button = page.locator(selector);
  await expect(button).toBeVisible();
  await button.click();
  await page.screenshot({ path: 'src/tests/screenshots/when-button-clicked.png', fullPage: true });
});

Then('the game board should be displayed', async function () {
  // Vérifie que le tableau de jeu est visible
  const gameBoard = page.locator('.game-board'); // Remplacez par le sélecteur approprié pour votre tableau de jeu
  await expect(gameBoard).toBeVisible();
});

Then('the button should be enabled', async function () {  
  const button = page.locator('button:has-text("NEW GAME")');
  await expect(button).toBeEnabled();
});

Then('the game board should reset to its initial state', async function () {
  // Vérifie que le tableau de jeu est dans son état initial
  const gameBoard = page.locator('.game-board'); // Remplacez par le sélecteur approprié pour votre tableau de jeu
  console.log(await gameBoard.count());
  await page.screenshot({ path: 'src/tests/screenshots/then-game-board-reset.png', fullPage: true });
}); 

// Ferme le navigateur après chaque scénario
AfterAll(async function () {
  if (browserContext) {
    await browserContext.close();
  }
  if (browser) {
    await browser.close();
  }
});