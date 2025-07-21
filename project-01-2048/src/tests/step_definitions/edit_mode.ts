import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import global from "../support/hooks.js"

let page = global.page;
let newBoard: number[][] = [];

Given("the game is in playing mode", async function () {
  const selector = `h2:has-text("edit mode")`;
  const h2 = page.locator(selector);
  await expect(h2).toHaveCount(0);
});

Given("the game is in edit mode", async function () {
  // Check that we are in edit mode
  const h2Selector = `h2:has-text("edit mode")`;
  const h2 = page.locator(h2Selector);
  if (await h2.count() === 0) {
    // Navigate to edit mode 
    const buttonEditSelector = `button:has-text("edit board")`;
    await page.waitForSelector(buttonEditSelector, { timeout: 10000 }); // Wait for the button to be present
    const buttonEdit = page.locator(buttonEditSelector);
    await expect(buttonEdit).toBeVisible();
    await buttonEdit.click();
  }
  
  await expect(h2).toHaveCount(1);
});

When('I press the "Edit Mode" button', async function () {
  const buttonEditSelector = `button:has-text("edit board")`;
  await page.waitForSelector(buttonEditSelector, { timeout: 10000 }); // Wait for the button to be present
  const buttonEdit = page.locator(buttonEditSelector);
  await expect(buttonEdit).toBeVisible();
  await buttonEdit.click();
});

When('I modify the board', async function () {
  const textarea = page.locator('textarea');
  await expect(textarea).toBeVisible();
  // Modify the board 
  newBoard = [
    [2, 4, 0, 0],
    [0, 0, 2, 4],
    [0, 0, 0, 2],
    [0, 0, 0, 0]
  ];
  const boardEditText = JSON.stringify(newBoard);
  await textarea.fill(boardEditText);
  await page.screenshot({ path: 'src/tests/screenshots/edit_board-when-modified.png', fullPage: true });
});

When('I press the "Save" button', async function () {
  const buttonSaveSelector = `button:has-text("SAVE")`;
  await page.waitForSelector(buttonSaveSelector, { timeout: 10000 }); // Wait for the button to be present
  const buttonSave = page.locator(buttonSaveSelector);
  await expect(buttonSave).toBeVisible();
  await buttonSave.click();
  await page.screenshot({ path: 'src/tests/screenshots/edit_board-when-saved.png', fullPage: true });
});

When('I press the "Cancel" button', async function () {
  const buttonCancelSelector = `button:has-text("CANCEL")`;
  await page.waitForSelector(buttonCancelSelector, { timeout: 10000 }); // Wait for the button to be present
  const buttonCancel = page.locator(buttonCancelSelector);
  await expect(buttonCancel).toBeVisible();
  await buttonCancel.click();
  await page.screenshot({ path: 'src/tests/screenshots/edit_board-when-cancelled.png', fullPage: true });
});

Then('an "Edit Mode" button should be visible', async function () {
  const buttonEditSelector = `button:has-text("edit board")`;
  await page.waitForSelector(buttonEditSelector, { timeout: 10000 }); // Wait for the button to be present
  const buttonEdit = page.locator(buttonEditSelector);
  await expect(buttonEdit).toBeVisible();
});

Then('the board should be editable', async function () {
  const selector = `h2:has-text("edit mode")`;
  const h2 = page.locator(selector);
  await expect(h2).toBeVisible();
  const textarea = page.locator('textarea');
  await expect(textarea).toBeVisible();
});

Then('a "Save" button should be visible', async function () {
  const buttonSaveSelector = `button:has-text("SAVE")`;
  await page.waitForSelector(buttonSaveSelector, { timeout: 10000 }); // Wait for the button to be present
  const buttonSave = page.locator(buttonSaveSelector);
  await expect(buttonSave).toBeVisible();
});

Then('a "Cancel" button should be visible', async function () {
  const buttonSaveSelector = `button:has-text("CANCEL")`;
  await page.waitForSelector(buttonSaveSelector, { timeout: 10000 }); // Wait for the button to be present
  const buttonSave = page.locator(buttonSaveSelector);
  await expect(buttonSave).toBeVisible();
});

Then('the board should reflect the changes made', async function () {
  for (let i=0; i < newBoard.length; i++) {
    const row = newBoard[i];
    for (let j=0; j < row.length; j++) {
      const expected = row[j].toString();
      const cellSelector = `[id="${i}-${j}"]`;
      const cell = page.locator(cellSelector);

      const actual = await cell.textContent() || '';
      let err = false;
      if (expected === '0') {
        if (actual !== '') {
          console.error(`Error in cell (${i}, ${j}): Expected empty, but found "${actual}"`);
          err = true;
        }
      } else if (expected === '*') {
        if (['', '2', '4'].indexOf(actual) === -1) {
          err = true;
        }else{
          global.newTile.push({number: parseInt(actual), position: [[i, j]]});
        }
      } else {
        if (expected !== actual) {
          console.error(`Error in cell (${i}, ${j}): Expected "${expected}", but found "${actual}"`);
          err = true;
        }
      }
      if (err) {
        console.error(`Error in cell (${i}, ${j}): Expected "${expected}", but found "${actual}"`);
        throw new Error(`Cell (${i}, ${j}) does not match expected value. Expected: "${expected}", Found: "${actual}"`);
      }
      global.board = newBoard; // Update the global board state
    }
  }
});

Then('the changes should be discarded', async function () {
  let board = global.board;
  for (let i=0; i < board.length; i++) {
    const row = board[i];
    for (let j=0; j < row.length; j++) {
      const expected = row[j].toString();
      const cellSelector = `[id="${i}-${j}"]`;
      const cell = page.locator(cellSelector);

      const actual = await cell.textContent() || '';
      let err = false;
      if (expected === '0') {
        if (actual !== '') {
          console.error(`Error in cell (${i}, ${j}): Expected empty, but found "${actual}"`);
          err = true;
        }
      } else if (expected === '*') {
        if (['', '2', '4'].indexOf(actual) === -1) {
          err = true;
        }else{
          global.newTile.push({number: parseInt(actual), position: [[i, j]]});
        }
      } else {
        if (expected !== actual) {
          console.error(`Error in cell (${i}, ${j}): Expected "${expected}", but found "${actual}"`);
          err = true;
        }
      }
      if (err) {
        console.error(`Error in cell (${i}, ${j}): Expected "${expected}", but found "${actual}"`);
        throw new Error(`Cell (${i}, ${j}) does not match expected value. Expected: "${expected}", Found: "${actual}"`);
      }
    }
  }
});

Then('the game should return to playing mode', async function () {
  const selector = `h2:has-text("edit mode")`;
  const h2 = page.locator(selector);
  await expect(h2).toHaveCount(0);
  // Check that the board is displayed
  const gameBoard = page.locator('.game-board-container');
  await expect(gameBoard).toBeVisible();
});
