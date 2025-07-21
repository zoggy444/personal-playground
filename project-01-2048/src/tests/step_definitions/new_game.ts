import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import global from "../support/hooks.js"

let page = global.page;

Given("I am on the game board page", async function () {
  await page.screenshot({ path: 'src/tests/screenshots/new_game-given-game-page.png', fullPage: true });
  const selector = `h1:has-text("2048")`;
  await page.waitForSelector(selector, { timeout: 10000 }); // Wait for the h1 to be present
  const h1 = page.locator(selector);
  await expect(h1).toBeVisible();
  // So that the board is not in its initial state
  await page.keyboard.press('ArrowLeft');
});

When('I click on the {string} button', async function (string) {
  const selector = `button:has-text("${string}")`;
  const button = page.locator(selector);
  await expect(button).toBeVisible();
  await button.click();
  await page.screenshot({ path: 'src/tests/screenshots/new_game-when-button-clicked.png', fullPage: true });
});

Then('I should see a {string} button', async function (buttonText) {
  const selector = `button:has-text("${buttonText}")`;
  await page.waitForSelector(selector, { timeout: 10000 }); // wait for the button to be present
  const button = page.locator(selector);
  await expect(button).toBeVisible();
});

Then('the board should be displayed', async function () {
  // Check that the board is displayed
  const gameBoard = page.locator('.game-board-container');
  await expect(gameBoard).toBeVisible();
});

Then('the button should be enabled', async function () {  
  const button = page.locator('button:has-text("NEW GAME")');
  await expect(button).toBeEnabled();
});
