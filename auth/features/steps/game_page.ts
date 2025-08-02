import { expect } from '@playwright/test';
import { Given, When, Then } from './fixtures.js';

let columnCurrent: number = 0;
let playerCurrent: number = 0;

Given('I am on the game page', async ({ page }) => {
  await page.goto('https://ominous-carnival-ppj9rx5rvpw376r4-5173.app.github.dev/');
  await page.waitForLoadState('domcontentloaded')
});

When('I land on the game page', async ({ page }) => {
  console.log("When I land");
  await page.goto('https://ominous-carnival-ppj9rx5rvpw376r4-5173.app.github.dev/');
});

When('I hover over a column', async ({ page }) => {
  columnCurrent = Math.floor(Math.random() * 7); // Randomly select a column from 0 to 6
  const column = page.locator('.column').nth(columnCurrent);
  await column.hover();
  //await expect(column).toHaveClass('highlighted'); // Assuming the column gets a 'highlighted' class on hover
});

When('I click', async ({ page }) => {
  const column = page.locator('.highlighted');
  await column.click()
});

Then('I should see a "Connect 4" title', async ({ page }) => {
  const h1 = page.locator(`h1:has-text("Connect 4")`);
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

Then('a coin of my color is dropped in the highlighted column', async ({}) => {
  // Step: Then a coin of my color is dropped in the highlighted column
  // From: features/game_page.feature:18:5
});

Then('my turn ends', async ({page}) => {
  if (playerCurrent === 1) {
    const h2 = page.locator(`h2:has-text("Player 1's turn")`);
    playerCurrent = 1;
    await expect(h2).toBeVisible();
  }else if (playerCurrent === 2) {
    const h2 = page.locator(`h2:has-text("Player 1's turn")`);
    playerCurrent = 1;
    await expect(h2).toBeVisible();
  }else{
    throw new Error;
    
  }
});

