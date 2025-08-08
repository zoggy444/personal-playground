import { expect } from '@playwright/test';
import { Given, When, Then } from './fixtures.js';
import { BoardSet } from '../src/App.tsx';

const url = process.env.BASE_URL || 'https://ominous-carnival-ppj9rx5rvpw376r4-5173.app.github.dev/';


Given('I am on the game page', async ({ page }) => {
  await page.goto(url);
  await page.waitForLoadState('domcontentloaded');
  expect(await page.title()).toBe('Geoguesser Mini');
});

Given('the {string} game mode is selected', async ({ page }, arg) => {
  console.log("Step yet to be implemented");
});

Given('I am in a game', async ({ page }) => {
  console.log("Step yet to be implemented");
});

Given('I have made two incorrect guesses', async ({ page }) => {
  console.log("Step yet to be implemented");
});

Given('The {string} button is available', async ({ page }, arg: string) => {
  console.log("Step yet to be implemented");
});

When('I land on the game page', async ({ page }) => {
  await page.goto(url);
  await page.waitForLoadState('domcontentloaded');
  expect(await page.title()).toBe('Geoguesser Mini');
});

When('I click on {string}', async ({ page }, arg) => {
  const button = page.locator(`button:has-text("${arg}")`);
  await button.click();
});

When('I make a guess on the map', async ({ page }) => {
  console.log("Step yet to be implemented");
});

When('the guess is within the correct region\\/department', async ({ page }) => {
  console.log("Step yet to be implemented");
});

When('the guess is outside the correct region\\/department', async ({ page }) => {
  console.log("Step yet to be implemented");
});

When('I make a third incorrect guess on the map', async ({ page }) => {
  console.log("Step yet to be implemented");
});

Then('I should see a title {string}', async ({ page }, arg: string) => {
  const title = await page.locator('h1').textContent();
  expect(title).toBe(arg);
});

Then('I should see a description {string}', async ({ page }, arg: string) => {
  expect(await page.locator('p').textContent()).toBe(arg);
});

Then('I should NOT see a map of France', async ({ page }) => {
  const map = page.locator('.leaflet-container');
  await expect(map).toBeHidden();
});

Then('I should see a way to select the game mode \\(regions or departments)', async ({ page }) => {
  const modeSelector = page.locator('.game-mode-selector');
  await expect(modeSelector).toBeVisible();
});

Then('I should see a button to start the game', async ({ page }) => {
  const startButton = page.locator('button:has-text("Start Game")');
  await expect(startButton).toBeVisible();
});

Then('A map of France with regions or department borders should be displayed', async ({}) => {
  console.log("Step yet to be implemented");
});

Then('regions\\/departments names should be hidden', async ({}) => {
  console.log("Step yet to be implemented");
});

Then('the name of a region\\/department to guess should be displayed', async ({}) => {
  console.log("Step yet to be implemented");
});

Then('I should see a message indicating the guess was correct', async ({ page }) => {
  console.log("Step yet to be implemented");
});

Then('the correct region\\/department should be highlighted green on the map', async ({ page }) => {
  console.log("Step yet to be implemented");
});

Then('A new round button should be available to start the next round', async ({ page }) => {
  console.log("Step yet to be implemented");
});

Then('I should see a message indicating the guess was incorrect', async ({ page }) => {
  console.log("Step yet to be implemented");
});

Then('the region\\/department I selected should be highlighted red on the map', async ({ page }) => {
  console.log("Step yet to be implemented");
});

Then('the name of a new region\\/department to guess should be displayed', async ({ page }) => {
  console.log("Step yet to be implemented");
});

Then('the map should reset to its initial state', async ({ page }) => {
  console.log("Step yet to be implemented");
});
