import {
    Given,
    When,
    Then,
  } from "@cucumber/cucumber";

import { createRoot } from 'react-dom/client'

import { expect, test } from "@playwright/test";

import global from "../support/hooks.js"

import App from "../../App.tsx";

let page = global.page;


Given('the board is', {timeout: 20 * 1000},  async function (dataTable) {
  // Navigate to edit mode and set the board, then save it
  const buttonEditSelector = `button:has-text("edit board")`;
  await page.waitForSelector(buttonEditSelector, { timeout: 10000 }); // Attend que le bouton soit présent
  const buttonEdit = page.locator(buttonEditSelector);
  await expect(buttonEdit).toBeVisible();
  await buttonEdit.click();
  await page.screenshot({ path: 'src/tests/screenshots/given-board-edit.png', fullPage: true });
  
  const table = dataTable.raw();
  const boardEditText = JSON.stringify(table);
  const textarea = page.locator('textarea');
  await expect(textarea).toBeVisible();
  await textarea.fill(boardEditText);
  await page.screenshot({ path: 'src/tests/screenshots/given-board-edit-filled.png', fullPage: true });
  
  const buttonSaveSelector = `button:has-text("SAVE")`;
  await page.waitForSelector(buttonSaveSelector, { timeout: 10000 }); // Attend que le bouton soit présent
  const buttonSave = page.locator(buttonSaveSelector);
  await expect(buttonSave).toBeVisible();
  await buttonSave.click();
  await page.screenshot({ path: 'src/tests/screenshots/given-board-saved.png', fullPage: true });
  //check that the board is saved and displayed
  for (let i=0; i < table.length; i++) {
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
  }
});
