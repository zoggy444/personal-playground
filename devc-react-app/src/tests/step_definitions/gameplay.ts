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
  
  const table = dataTable.raw().map((row:string[]) => row.map(cell => parseInt(cell)));
  //console.log(table);
  const boardEditText = JSON.stringify(table);
  const textarea = page.locator('textarea');
  await expect(textarea).toBeVisible();
  await textarea.fill(boardEditText);
  //console.log(`Filling textarea with: ${boardEditText}`);
  await page.screenshot({ path: 'src/tests/screenshots/given-board-edit-filled.png', fullPage: true });
  
  const buttonSaveSelector = `button:has-text("SAVE")`;
  await page.waitForSelector(buttonSaveSelector, { timeout: 10000 }); // Attend que le bouton soit présent
  const buttonSave = page.locator(buttonSaveSelector);
  await expect(buttonSave).toBeVisible();
  //console.log(`Clicking save button: ${await buttonSave.textContent()}`);
  await buttonSave.click();
  await page.screenshot({ path: 'src/tests/screenshots/given-board-saved.png', fullPage: true });
  let board:number[][] = [];
  //check that the board is saved and displayed
  for (let i=0; i < table.length; i++) {
    board.push([]);
    const row = table[i];
    for (let j=0; j < row.length; j++) {
      const cellSelector = `[id="${i}-${j}"]`;
      const cellValue = row[j].toString();
      const cell = page.locator(cellSelector);
      
      const content = await cell.textContent() || '';
      let err = false;
      if (cellValue === '0') {
        if (content !== '') {
          console.error(`Error in cell (${i}, ${j}): Expected empty, but found "${content}"`);
          err = true;
        }else{
          board[i].push(0);
        }
      } else if (cellValue === '*') {
        if (['', '2', '4'].indexOf(content) === -1) {
          err = true;
        }else{
          global.newTile.push({number: parseInt(content), position: [[i, j]]});
          board[i].push(parseInt(content));
        }
      } else {
        if (cellValue !== content) {
          console.error(`Error in cell (${i}, ${j}): Expected "${cellValue}", but found "${content}"`);
          err = true;
        }else{
          board[i].push(parseInt(content));
        }
      }
      if (err) {
        console.error(`Error in cell (${i}, ${j}): Expected "${cellValue}", but found "${content}"`);
        throw new Error(`Cell (${i}, ${j}) does not match expected value. Expected: "${cellValue}", Found: "${content}"`);
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
  // str is not used
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
  //global.isBoardCorrect(table);
  for (let i=0; i < board.length; i++) {
    const row = board[i];
    for (let j=0; j < row.length; j++) {
      const cellSelector = `[id="${i}-${j}"]`;
      const cellValue = row[j].toString();
      const cell = page.locator(cellSelector);
      
      //console.log(`Checking cell at (${i}, ${j}): ${cellValue}`);
      //console.log(await cell.count());
      const content = await cell.textContent() || '';
      let err = false;
      if (cellValue === '0' && content !== '') {
        console.error(`Error in cell (${i}, ${j}): Expected empty, but found "${content}"`);
        err = true;
      } else if (cellValue !== '0' && cellValue !== content) {
        console.error(`Error in cell (${i}, ${j}): Expected "${cellValue}", but found "${content}"`);
        err = true;
      }
      if (err) {
        console.error(`Error in cell (${i}, ${j}): Expected "${cellValue}", but found "${content}"`);
        throw new Error(`Cell (${i}, ${j}) does not match expected value. Expected: "${cellValue}", Found: "${content}"`);
      }
    }
  }
});

Then('the game should be over', async function () {
  await expect(page.getByText('YOU LOST...')).toBeVisible();
});