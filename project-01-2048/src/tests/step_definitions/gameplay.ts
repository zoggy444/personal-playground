import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import global from "../support/hooks.js"

let page = global.page;

Given('the board is', {timeout: 20 * 1000},  async function (dataTable) {
  // Navigate to edit mode and set the board, then save it
  const buttonEditSelector = `button:has-text("edit board")`;
  await page.waitForSelector(buttonEditSelector, { timeout: 10000 }); // Wait for the button to be present
  const buttonEdit = page.locator(buttonEditSelector);
  await expect(buttonEdit).toBeVisible();
  await buttonEdit.click();
  await page.screenshot({ path: 'src/tests/screenshots/gameplay-given-board-edit.png', fullPage: true });
  
  const table = dataTable.raw().map((row:string[]) => row.map(cell => parseInt(cell)));
  const boardEditText = JSON.stringify(table);
  const textarea = page.locator('textarea');
  await expect(textarea).toBeVisible();
  await textarea.fill(boardEditText);
  await page.screenshot({ path: 'src/tests/screenshots/gameplay-given-board-edit-filled.png', fullPage: true });
  
  const buttonSaveSelector = `button:has-text("SAVE")`;
  await page.waitForSelector(buttonSaveSelector, { timeout: 10000 }); // Wait for the button to be present
  const buttonSave = page.locator(buttonSaveSelector);
  await expect(buttonSave).toBeVisible();
  await buttonSave.click();
  await page.screenshot({ path: 'src/tests/screenshots/gameplay-given-board-saved.png', fullPage: true });
  let board:number[][] = [];
  //check that the board is saved and displayed
  for (let i=0; i < table.length; i++) {
    board.push([]);
    const row = table[i];
    for (let j=0; j < row.length; j++) {
      const expected = row[j].toString();
      const cellSelector = `[id="${i}-${j}"]`;
      const cell = page.locator(cellSelector);
      const actual = await cell.textContent() || '';
      let err = false;
      if (expected === '0') {
        if (actual !== '') {
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

When('I press the right arrow key', async function () {
  await page.keyboard.press('ArrowRight');
});

When('I press the left arrow key', async function () {
  await page.keyboard.press('ArrowLeft');
});

When('I press the up arrow key', async function () {
  await page.keyboard.press('ArrowUp');
});

When('I press the down arrow key', async function () {
  await page.keyboard.press('ArrowDown');
});

Then('a new 2 or 4 appears {}', async function (str) {
  // str is not necessary, but it is used to ensure the step is called
  if (global.newTile.length === 0) {
    throw new Error("No new tile found on the board.");
  }else{
    global.newTile = []; // Reset the newTile array after checking
  }
});

Then('no new tile appears on the board', async function () {
  if (global.newTile.length !== 0) {
    throw new Error("No new tile found on the board.");
  }
});

Then('the board should be unchanged', async function () {
  let board = global.board ;
  for (let i=0; i < board.length; i++) {
    const row = board[i];
    for (let j=0; j < row.length; j++) {
      const expected = row[j].toString();
      const cellSelector = `[id="${i}-${j}"]`;
      const cell = page.locator(cellSelector);
      const actual = await cell.textContent() || '';
      let err = false;
      if (expected === '0' && actual !== '') {
        console.error(`Error in cell (${i}, ${j}): Expected empty, but found "${actual}"`);
        err = true;
      } else if (expected !== '0' && expected !== actual) {
        console.error(`Error in cell (${i}, ${j}): Expected "${expected}", but found "${actual}"`);
        err = true;
      }
      if (err) {
        console.error(`Error in cell (${i}, ${j}): Expected "${expected}", but found "${actual}"`);
        throw new Error(`Cell (${i}, ${j}) does not match expected value. Expected: "${expected}", Found: "${actual}"`);
      }
    }
  }
});

Then('the game should be over', async function () {
  await expect(page.getByText('YOU LOST...')).toBeVisible();
});