import { expect } from '@playwright/test';
import { Given, When, Then } from './fixtures.js';

import departmentData from '../../data/departements-version-simplifiee.json' with { type: "json" };
import regionData from '../../data/regions-version-simplifiee.json' with { type: "json" };

import { GeoDataType, AreaType } from '../../src/App.tsx';

const url = process.env.BASE_URL || 'https://ominous-carnival-ppj9rx5rvpw376r4-5173.app.github.dev/';

let regionKVMap = new Map<string, string>(
  regionData.features.map(feature => [feature.properties.code, feature.properties.nom]
));
let departmentKVMap = new Map<string, string>(
  departmentData.features.map(feature => [feature.properties.code, feature.properties.nom])
);

let gameMode: AreaType = 'region'; // Default game mode
let dataSource = new Map<AreaType, Map<string, string>>(
  [
    ['region', regionKVMap],
    ['department', departmentKVMap]
  ]
);
let hoverKey: string = '';
let toGuessGlobal: string = '';
let nbCorrectGuesses = 0;

function getDataMap() {
  const dataMap = dataSource.get(gameMode);
  if (!dataMap) {
    throw new Error(`No data found for game mode: ${gameMode}`);
  }
  return dataMap
}

/**
 * getKeys function to retrieve keys based on the game mode and the area to guess.
 * @param param0 
 * @returns 
 */
function getKeys({toGuess, operator, nbKeys}:
    {
      toGuess: string;
      operator: '!==' | '===';
      nbKeys?: number;
    }): string[] {
  const dataMap = getDataMap();
  if (operator === '===') {
    return [...dataMap.entries()]
      .filter(({ 1: v }) => v === toGuess)
      .map(([k]) => k)
  }
  if (!nbKeys) nbKeys = 2;
  // Take the first nbKeys+1 to guess to make sure at least nbKeys are wrong
  return [...dataMap.entries()]
    .slice(0, nbKeys+1) 
    .filter(({ 1: v }) => v !== toGuess)
    .map(([k]) => k)
    .slice(0, nbKeys);
}

// @todo: randomize game mode selection and place to guess

Given('I am on the game page', async ({ page }) => {
  await page.goto(url);
  await page.waitForLoadState('domcontentloaded');
  expect(await page.title()).toBe('Geoguesser Mini');
});

Given('I am in a game', async ({ page }) => {
  await page.goto(url);
  await page.waitForLoadState('domcontentloaded');
  expect(await page.title()).toBe('Geoguesser Mini');
  await page.click('button:has-text("Start Game")');
  await page.waitForSelector('.leaflet-container'); // Wait for the map to load
  gameMode = 'region';
  expect(await page.locator('.leaflet-container').isVisible()).toBe(true);
  expect(await page.locator('.to-guess-name').isVisible()).toBe(true);
  nbCorrectGuesses = 0;
});

Given('I have made two incorrect guesses', async ({ page }) => {
  const toGuess = await page.locator('.to-guess-name').textContent();
  const guessedKeys = getKeys({
    toGuess: toGuess || '',
    operator: '!==',
    nbKeys: 2
  });
  console.log(`Guessing: ${toGuess} with wrong keys: ${guessedKeys}`);
  await page.locator(`.area-${guessedKeys[0]}`).click();
  await page.locator(`.area-${guessedKeys[1]}`).click();
});

Given('I succeeded or failed guessing an area', async ({ page }, arg: string) => {
  const toGuess = await page.locator('.to-guess-name').textContent();
  // make both an incorrect and a correst guess to ensure both red and green highlight are reset
  let wrongGuessKey = getKeys({
    toGuess: toGuess || '',
    operator: '!==',
    nbKeys: 1
  })[0];
  console.log(`Guessing: ${toGuess} with wrong key: ${wrongGuessKey}`);
  await page.locator(`.area-${wrongGuessKey}`).click();
  
  let correctGuessKey = getKeys({
    toGuess: toGuess || '',
    operator: '==='
  })[0];
  console.log(`Guessing: ${toGuess} with key: ${correctGuessKey}`);
  await page.locator(`.area-${correctGuessKey}`).click();
  const button = page.locator(`button:has-text("New Round")`);
  await expect(button).toBeVisible();
  await expect(button).toBeEnabled();
});

Given('there is only one area left to guess', async ({ page }, arg: string) => {
  // todo after mockState refactor
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

When('I hover over a region\\/department on the map', async ({ page }, arg) => {
  const dataMap = dataSource.get(gameMode);
  if (!dataMap) {
    throw new Error(`No data found for game mode: ${gameMode}`);
  }
  
  hoverKey = dataMap.keys().next().value; // Hover over the first area
  console.log(`Hovering over area with key: ${hoverKey}`);
  await page.locator(`.area-${hoverKey}`).hover();
});

When('I guess correctly', async ({ page }) => {
  const toGuess = await page.locator('.to-guess-name').textContent();
  const correctGuessKey = getKeys({
    toGuess: toGuess || '',
    operator: '==='
  })[0];
  console.log(`Guessing: ${toGuess} with key: ${correctGuessKey}`);
  await page.locator(`.area-${correctGuessKey}`).click();
  nbCorrectGuesses += 1;
});

When('I make an incorrect guess on the map', async ({ page }) => {
  const toGuess = await page.locator('.to-guess-name').textContent();
  let wrongGuessKey = getKeys({
    toGuess: toGuess || '',
    operator: '!==',
    nbKeys: 1
  })[0];
  console.log(`Guessing: ${toGuess} with wrong key: ${wrongGuessKey}`);
  await page.locator(`.area-${wrongGuessKey}`).click();
});

When('I make a third incorrect guess on the map', async ({ page }) => {
  const toGuess = await page.locator('.to-guess-name').textContent();
  let wrongGuessKeys = getKeys({
    toGuess: toGuess || '',
    operator: '!==',
    nbKeys: 3
  });
  console.log(`third guessGuessing: ${toGuess} with wrong key: ${wrongGuessKeys[2]}`);
  await page.locator(`.area-${wrongGuessKeys[2]}`).click();
});

When('I quit the game', async ({ page }) => {
  await page.getByRole('button', {'name': 'Quit Game'}).click()
});

Then('I should see a title {string}', async ({ page }, arg: string) => {
  await expect(page.getByRole('heading', { name: arg })).toBeVisible();
});

Then('I should see a description {string}', async ({ page }, arg: string) => {
  expect(await page.locator('p').textContent()).toBe(arg);
});

Then('I should NOT see a map of France', async ({ page }) => {
  const map = page.locator('.leaflet-container');
  await expect(map).toBeHidden();
});

Then('I should see a way to select the game mode \\(region or department)', async ({ page }) => {
  const modeSelector = page.locator('.game-mode-selector');
  await expect(modeSelector).toBeVisible();
});

Then('I should have a way to start a new game', async ({ page }) => {
  const startButton = page.getByRole('button', {name: 'Start Game'});
  await expect(startButton).toBeVisible();
});

Then('A map of France with region or department borders should be displayed', async ({ page }) => {
  const map = page.locator('.leaflet-container');
  await expect(map).toBeVisible();
  const area = await page.locator('path.leaflet-interactive').count();
  expect(area).toBeGreaterThan(0);
});

Then('region\\/department names should be hidden', async ({ page }) => {
  const layers = await page.locator('path').all();
  for (let i=0 ; i<layers.length; i++) {
    const l = layers[i];
    expect(await l.textContent()).toBe("");
  }
});

Then('the name of a region\\/department to guess should be displayed', async ({ page }) => {
  const name = await page.locator('.to-guess-name').textContent();
  if (!toGuessGlobal) {
    toGuessGlobal = name || '';
  }else{
    // do not have twice the same region to guess
    expect(name).not.toBe(toGuessGlobal);
  }
  expect(name).not.toBeNull();
});

Then('I should have a way to quit the game', async ({ page }) => {
  const button = page.getByRole('button', { name: 'Quit Game' })
  await expect(button).toBeVisible()
  await expect(button).toBeEnabled();
});

Then('the region\\/department should be highlighted without changing color', async ({ page }) => {
  const hoveredArea = page.locator(`.area-${hoverKey}`);
  expect(await hoveredArea.getAttribute('stroke-width')).toBe('3')
});

Then('I should see a message indicating the guess was correct', async ({ page }) => {
  const message = 'You guessed correctly !';
  expect(await page.locator(`text=${message}`).isVisible()).toBe(true);
});

Then('the correct region\\/department should be highlighted green on the map', async ({ page }) => {
  const guessedArea = await page.locator("[stroke='green']").count();
  expect(guessedArea).toBeGreaterThan(0);
});

Then('A new round button should be available to start the next round', async ({ page }) => {
  const nextRoundButton = page.locator('button:has-text("New Round")');
  await expect(nextRoundButton).toBeVisible();
  await expect(nextRoundButton).toBeEnabled();
});

Then('I should see a message indicating the guess was incorrect', async ({ page }) => {
  const message = 'You guessed incorrectly... try again!';
  expect(await page.locator(`text=${message}`).isVisible()).toBe(true);
});

Then('I should see a message indicating that I lost the round', async ({ page }) => {
  const message = 'You have made 3 incorrect guesses.';
  expect(await page.locator(`text=${message}`).isVisible()).toBe(true);
});

Then('the region\\/department I selected should be highlighted red on the map', async ({ page }) => {
  const guessedRegion = await page.locator("[stroke='red']").count();
  expect(guessedRegion).toBeGreaterThan(0);
});

Then('I should not be able to make another guess', async ({ page }) => {
  const toGuess = await page.locator('.to-guess-name').textContent();
  // we ake the 4th one because the first 3 are already guessed
  let wrongGuessKey= getKeys({
    toGuess: toGuess || '',
    operator: '!==',
    nbKeys: 4
  })[3];
  console.log(`Guessing: ${toGuess} with wrong key: ${wrongGuessKey}`);
  const guessedArea = page.locator(`.area-${wrongGuessKey}`);
  await guessedArea.click();
  expect(await guessedArea.getAttribute('stroke')).toBe('blue');
  // make sure that the correct area also cannot be guessed
  const correctKey = getKeys({
    toGuess: toGuess || '',
    operator: '==='
  })[0];
  const correctArea = page.locator(`.area-${correctKey}`);
  if (await correctArea.getAttribute('stroke') === 'blue') {
    await correctArea.click();
    expect(await correctArea.getAttribute('stroke')).toBe('blue');
  }
});
 
Then('the correct region\\/department should be intermitentently highlighted on the map', async ({ page }) => {
  const toGuess = await page.locator('.to-guess-name').textContent();
  let correctKey = getKeys({
    toGuess: toGuess || '',
    operator: '==='
  })[0];
  console.log(`correctKey: ${correctKey}, hoverKey: ${hoverKey}`);
  const correctArea = page.locator(`.area-${correctKey}`);
  expect(correctArea).toContainClass('failed');
  /*const toGuessHighlight = await page.locator(`.area-${correctKey}`).getAttribute('stroke-width');
  await page.waitForTimeout(1000);
  const newToGuessHighlight = await page.locator(`.area-${correctKey}`).getAttribute('stroke-width');
  console.log(`toGuessColor: ${toGuessHighlight}, newToGuessColor: ${newToGuessHighlight}`);
  expect(toGuessHighlight).not.toBe(newToGuessHighlight);*/
});

Then('the area to guess should not have been already guessed', async ({ page }) => {
  // todo after mockState refactor
});

Then('the red-highlighted areas should be reset', async ({ page }) => {
  const guessedArea = await page.locator("[stroke='red']").count();
  expect(guessedArea).toBe(0);
});

Then('the green-highlighted areas should stay the same', async ({ page }) => {
  const guessedArea = await page.locator("[stroke='green']").count();
  expect(guessedArea).toBe(nbCorrectGuesses);
});

Then('I should land on the game settings', async ({ page }) => {
  const map = page.locator('.leaflet-container');
  await expect(map).toBeHidden();
  const startButton = page.getByRole('button', {name: 'Start Game'});
  await expect(startButton).toBeVisible();
});

Then('I should see a message indicating that I won the game', async ({ page }) => {
  const message = page.getByRole('heading', {name: 'YOU WON THE GAME'})
  await expect(message).toBeVisible();
});
