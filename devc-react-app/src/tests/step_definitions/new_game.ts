import {
    Given,
    When,
    Then,
    After,
    Before,
  } from "@cucumber/cucumber";

import { Page, Browser, chromium, expect } from "@playwright/test";

let browser: Browser;
let page: Page;

Before(async function () {
  // Initialisation du navigateur avant chaque scénario
  browser = await chromium.launch();
  page = await browser.newPage();
  // Vérifie si on est sur la page de login GitHub
  if (page.url().includes("github.com/login")) {
    await page.fill('input[name="login"]', process.env.GITHUB_USER || "your-username");
    await page.fill('input[name="password"]', process.env.GITHUB_PASSWORD || "your-password");
    await page.click('input[name="commit"]');
    await page.screenshot({ path: 'debug-login.png', fullPage: true });

    // Attends la redirection vers ton appli
    await page.waitForURL(/app\.github\.dev/);
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