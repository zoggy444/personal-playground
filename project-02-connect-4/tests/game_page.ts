import { expect } from '@playwright/test';
import { Given, When, Then } from './fixtures';

let columnCurrent: number = 0;

Given('I am on the game page', async ({ page }) => {
  await page.goto('https://ominous-carnival-ppj9rx5rvpw376r4-5173.app.github.dev/');
  await page.waitForLoadState('domcontentloaded')
});

When('I land on the game page', async ({ page }) => {
  await page.goto('https://ominous-carnival-ppj9rx5rvpw376r4-5173.app.github.dev/');
});

When('I hover over a column', async ({ page }) => {
  columnCurrent = Math.floor(Math.random() * 7); // Randomly select a column from 0 to 6
  const column = page.locator('.column').nth(columnCurrent);
  await column.hover();
  await expect(column).toHaveClass('highlighted'); // Assuming the column gets a 'highlighted' class on hover
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
  await expect(h2).toBeVisible();
});

Then('the column should highlight', async ({page}) => {
  const column = page.locator('.column').nth(columnCurrent);
  await expect(column).toHaveClass(/highlighted/);
});
