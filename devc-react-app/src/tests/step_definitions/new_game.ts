import {
    Given,
    When,
    Then,
  } from "@cucumber/cucumber";

import { expect } from "@playwright/test";
import * as OTPAuth from "otpauth"

import global from "../support/hooks.js"

let page = global.page;

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

Then('the game board should be', {timeout: 20 * 1000},  async function (dataTable) {
  const table = dataTable.raw();
  global.isBoardCorrect(table, page);
  /*for (let i=0; i < table.length; i++) {
    const row = table[i];
    for (let j=0; j < row.length; j++) {
      const cellSelector = `[id="${i}-${j}"]`;
      const cellValue = row[j].trim();
      const cell = page.locator(cellSelector);
      
      //console.log(`Checking cell at (${i}, ${j}): ${cellValue}`);
      //console.log(await cell.count());
      //console.log(await cell.textContent());
      await cell.count();
      let expectedText;
      if (cellValue === '0') {
        expectedText = '';
        //await expect(cell).toHaveText('', { timeout: 5000 });
      } else if (cellValue === '*') {
        expectedText = /|2|4/;
        //await expect(cell).toHaveText(/|2|4/, { timeout: 5000 });
      } else {
        expectedText = cellValue;
        //await expect(cell).toHaveText(cellValue, { timeout: 5000 });
      }
      await expect(cell).toHaveText(expectedText, { timeout: 5000 });
    }
  }*/
});
