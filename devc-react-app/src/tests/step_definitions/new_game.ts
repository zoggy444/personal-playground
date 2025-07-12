import {
    Given,
    When,
    Then,
    After,
    Before,
  } from "@cucumber/cucumber";

import { Page, Browser, chromium, expect } from "@playwright/test";
import * as OTPAuth from "otpauth"

const totp = new OTPAuth.TOTP({
  issuer: "Raccoon",
  label: "GitHub",
  algorithm: "SHA1",
  digits: 6,
  period: 30,
  secret: process.env.GITHUB_OTP,
})

let browser: Browser;
let page: Page;

Before(async function () {
  // Initialisation du navigateur avant chaque scénario
  browser = await chromium.launch();
  page = await browser.newPage();

  await page.goto("https://github.com/")
  await page.getByRole("link", { name: "Sign in" }).click()
  await page.getByLabel("Username or email address").click()
  await page
   .getByLabel("Username or email address")
   .fill(process.env.GITHUB_USER)
  await page.getByLabel("Username or email address").press("Tab")
  await page.getByLabel("Password").fill(process.env.GITHUB_PASSWORD)
  await page.getByRole("button", { name: "Sign in" }).click()
  await page.getByPlaceholder("XXXXXX").click()
  await page.getByPlaceholder("XXXXXX").fill(totp.generate())
  //await expect(page).toHaveURL("https://github.com")
  await page.screenshot({ path: "home.png" })

  await page.goto("https://potential-barnacle-rp4wgj5gv9wfppg-3000.app.github.dev/");
  //console.log(page.url());
  //console.log(await page.content());
  await page.screenshot({ path: 'debug-before-login.png', fullPage: true });
  // Vérifie si l'input existe
  const loginInput = page.locator('input[name="login"]');
  if (await loginInput.count() > 0) {
    console.log("L'input login est présent sur la page.");
    await page.fill('input[name="login"]', process.env.GITHUB_USER);
    await page.fill('input[name="password"]', process.env.GITHUB_PASSWORD);
    await page.click('input[name="commit"]');
    await page.screenshot({ path: 'debug-login.png', fullPage: true });

    // Attends la redirection vers ton appli
    await page.waitForURL(/app\.github\.dev/);
  } else {
    console.log("L'input login n'est pas présent sur la page.");
  }
});

Given("I am on the game board page", async function () {

  await page.goto("https://potential-barnacle-rp4wgj5gv9wfppg-3000.app.github.dev/");
  await page.screenshot({ path: 'debug.png', fullPage: true });

});

Then('I should see a {string} button', async function (buttonText) {
  console.log("Checking for button: " + buttonText);
  const selector = `button:has-text("${buttonText}")`;
  await page.waitForSelector(selector, { timeout: 10000 }); // Attend que le bouton soit présent
  const button = page.locator(selector);
  console.log(await button.count());
  await expect(button).toBeVisible();
});

Then('the button should be enabled', async function () {  
  const button = page.locator('button:has-text("NEW GAME")');
  await expect(button).toBeEnabled();
});

// Ferme le navigateur après chaque scénario
After(async function () {
  if (browser) {
    await browser.close();
  }
});