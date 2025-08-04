import { expect } from '@playwright/test';
import { Given, When, Then } from './fixtures.js';
import { BoardSet } from '../src/App.tsx';

const url = process.env.BASE_URL || 'https://ominous-carnival-ppj9rx5rvpw376r4-5173.app.github.dev/';

let columnCurrent: number = 0;
let colCurrentEmpty: number = 0;
let playerCurrent: number = 1;

Given('I am on the game page', async ({ page }) => {
  await page.goto(url);
  await page.waitForLoadState('domcontentloaded')
});

When('I land on the game page', async ({ page }) => {
  console.log("When I land");
  await page.goto(url);
});

When('I hover over a column', async ({ page }) => {
  columnCurrent = Math.floor(Math.random() * 7); // Randomly select a column from 0 to 6
  const column = page.locator('.column').nth(columnCurrent);
  const emptySlots = column.locator('.slot:not(.fill)');
  const emptySlotCount = await emptySlots.count();
  colCurrentEmpty = emptySlotCount;
  await column.hover();
});

When('I hover over a column that is not full', async ({ page }) => {
  columnCurrent = Math.floor(Math.random() * 7); // Randomly select a column from 0 to 6
  const column = page.locator('.column').nth(columnCurrent);
  const emptySlots = column.locator('.slot:not(.fill)');
  const emptySlotCount = await emptySlots.count();
  colCurrentEmpty = emptySlotCount;
  await column.hover();
});

When('I hover over a column that is full', async ({ page }) => {
  columnCurrent = Math.floor(Math.random() * 7); // Randomly select a column from 0 to 6
  const column = page.locator('.column').nth(columnCurrent);
  await column.click()
  await column.click()
  await column.click()
  await column.click()
  await column.click()
  await column.click()
  const emptySlots = column.locator('.slot:not(.fill)');
  const emptySlotCount = await emptySlots.count();
  colCurrentEmpty = emptySlotCount;
  if (emptySlotCount > 0) {
    throw new Error(`Column ${columnCurrent} has ${emptySlotCount} empty slots, expected it to be full.`);
  }
});

When('I click', async ({ page }) => {
  const column = page.locator('.highlighted');
  await column.click()
});

When('I connect four coins in a line', async ({ page }) => {
  for (let i = 0; i < 4; i++) {
    columnCurrent = i; // Connect four in the first four columns
    const column = page.locator('.column').nth(columnCurrent);
    await column.click();
    if (i < 3) await column.click()  // don't click the last column again to avoid filling it
  }
});

Then('I should see a "Connect 4" title', async ({ page }) => {
  const h1 = page.locator(`h1:has-text("Connect 4")`);
  await page.screenshot({ path: "tests/screenshots/game-page-then-see-connect-4.png" })
  await expect(h1).toBeVisible();
});

Then('I should see an empty 7x6 board', async ({ page }) => {
  const columns = page.locator(`.column`);
  await expect(columns).toHaveCount(7);
  const slots = page.locator(`.slot`);
  await expect(slots).toHaveCount(42);
});

Then("it should be player 1's turn", async ({ page }) => {
  const h2 = page.locator(`h2:has-text("Player 1's turn")`);
  playerCurrent = 1;
  await expect(h2).toBeVisible();
});

Then('the column should highlight', async ({page}) => {
  const column = page.locator('.column').nth(columnCurrent);
  await expect(column).toHaveClass(/highlighted/);
});

Then('a coin of my color is dropped in the highlighted column', async ({page}) => {
  const column = page.locator('.column').nth(columnCurrent);
  // Locate slots in the column that do NOT have the "fill" class
  const emptySlots = column.locator('.slot:not(.fill)');
  const emptySlotCount = await emptySlots.count();
  if (emptySlotCount !== colCurrentEmpty-1) {
    throw new Error(`Empty slot count does not match expected fill count, expected: ${colCurrentEmpty-1}, got: ${emptySlotCount}`);
  }
});

Then('my turn ends', async ({page}) => {
  if (playerCurrent === 1) {
    const h2 = page.locator(`h2:has-text("Player 2's turn")`);
    playerCurrent = 2;
    await expect(h2).toBeVisible();
  }else if (playerCurrent === 2) {
    const h2 = page.locator(`h2:has-text("Player 1's turn")`);
    playerCurrent = 1;
    await expect(h2).toBeVisible();
  }
});

Then('nothing happens', async ({ page }) => {
  const column = page.locator('.column').nth(columnCurrent);
  // Locate slots in the column that do NOT have the "fill" class
  const emptySlots = column.locator('.slot:not(.fill)');
  const emptySlotCount = await emptySlots.count();
  if (emptySlotCount !== colCurrentEmpty) {
    throw new Error(`Empty slot count does not match expected fill count, expected: ${colCurrentEmpty}, got: ${emptySlotCount}`);
  }
});

Then('I should still see my turn', async ({ page }) => {
  if (playerCurrent === 1) {
    const h2 = page.locator(`h2:has-text("Player 1's turn")`);
    await expect(h2).toBeVisible();
  }else if (playerCurrent === 2) {
    const h2 = page.locator(`h2:has-text("Player 2's turn")`);
    await expect(h2).toBeVisible();
  }
});

Then('I should see a message indicating that I won', async ({ page }) => {
  if (playerCurrent === 1) {
    const h2 = page.locator(`h2:has-text("Player 1 wins!")`);
    await expect(h2).toBeVisible();
  }else if (playerCurrent === 2) {
    const h2 = page.locator(`h2:has-text("Player 2 wins!")`);
    await expect(h2).toBeVisible();
  }
});

Then('the game should end', async ({ page }) => {
  // Step: And the game should end
  // From: features\game_page.feature:32:5
});

