import { expect, Locator, Page } from '@playwright/test';
import { Given, When, Then } from './fixtures.js';

import departmentData from '../../data/departements-version-simplifiee.json' with { type: "json" };
import regionData from '../../data/regions-version-simplifiee.json' with { type: "json" };

const url = process.env.BASE_URL || 'https://ominous-carnival-ppj9rx5rvpw376r4-5173.app.github.dev/';

const regInitKVMap = new Map<string, string>(
  regionData.features.map(feature => [feature.properties.code, feature.properties.nom]
));
const dptInitKVMap = new Map<string, string>(
  departmentData.features.map(feature => [feature.properties.code, feature.properties.nom])
);

type mockStateType = {
  gameMode: 'reg' | 'dpt';
  regLeftToGuess: Map<string, string>;
  regWrongGuessKeys: string[];
  dptLeftToGuess: Map<string, string>;
  dptWrongGuessKeys: string[];
  hoverKey?: string;
}

let mockState: mockStateType = {
  gameMode: 'reg',
  regLeftToGuess: new Map(regInitKVMap),
  regWrongGuessKeys: [],
  dptLeftToGuess: new Map(dptInitKVMap),
  dptWrongGuessKeys: [],
}

function resetState () {
  mockState = {
    gameMode: 'reg',
    regLeftToGuess: new Map(regInitKVMap),
    regWrongGuessKeys: [],
    dptLeftToGuess: new Map(dptInitKVMap),
    dptWrongGuessKeys: [],
  }
}

async function getToGuessKey(page: Page) {
  let KVMap = new Map(mockState[`${mockState.gameMode}LeftToGuess`])
  const toGuess = await page.locator('.to-guess-name').textContent();
  const entries = [...KVMap.entries()]
      .find(([, g]) => g === toGuess);
  // console.log(`getToGuessKey: ${entries}`)
  if (entries) return entries[0];
  console.error("No entry found for area to guess: " + toGuess);
  return '-1';
}

async function getRdmKeys(page: Page, exWrongGuesses=true, nb=1) {
  let KVMap = new Map<string, string>(mockState[`${mockState.gameMode}LeftToGuess`])
  const wrongGuessKeys = mockState[`${mockState.gameMode}WrongGuessKeys`]
  const toGuessKey = await getToGuessKey(page);
  if (toGuessKey) KVMap.delete(toGuessKey);
  if (exWrongGuesses) {
    for (let I = 0; I < wrongGuessKeys.length; I++) {
      const wrongGuessKey = wrongGuessKeys[I];
      KVMap.delete(wrongGuessKey);
    }
  }
  const keys = Array.from(KVMap.keys());
  let res:string[] = []
  for (let i=0; i<nb; i++) {
    res.push(keys[Math.floor(Math.random() * keys.length)])
  }
  // console.log(`getRdmKeys: ${res}`)
  return res;
}

Given('I am on the game page', async ({ page }) => {
  resetState();
  await page.goto(url);
  await page.waitForLoadState('domcontentloaded');
  expect(await page.title()).toBe('Geoguesser Mini');
});

Given('I selected a game mode', async ({ page }) => {
  const radioGroup = page.getByRole('radiogroup')
  if (Math.floor(Math.random()) === 0) {
    mockState.gameMode = 'reg';
    await radioGroup.getByLabel('Regions').check();
  }else {
    mockState.gameMode = 'dpt';
    await radioGroup.getByLabel('Departments').check();
  }
});

Given('I am in a game', async ({ page }) => {
  resetState();
  await page.goto(url);
  await page.waitForLoadState('domcontentloaded');
  expect(await page.title()).toBe('Geoguesser Mini');
  await page.click('button:has-text("Start Game")');
  await page.waitForSelector('.leaflet-container'); // Wait for the map to load
  
  expect(await page.locator('.leaflet-container').isVisible()).toBe(true);
  expect(await page.locator('.to-guess-name').isVisible()).toBe(true);
});

Given('I have made two incorrect guesses', async ({ page }) => {
  const toGuess = await page.locator('.to-guess-name').textContent();
  const guessedKeys = await getRdmKeys(page, true, 2);
  // console.log(`Guessing: ${toGuess} with wrong keys: ${guessedKeys}`);
  await page.locator(`.area-${guessedKeys[0]}`).click();
  await page.locator(`.area-${guessedKeys[1]}`).click();
  mockState[`${mockState.gameMode}WrongGuessKeys`] = guessedKeys;
});

Given('I succeeded or failed guessing an area', async ({ page }, arg: string) => {
  const toGuessKey = await getToGuessKey(page)
  let mode = Math.floor(Math.random()) === 0 ? 'success' : 'failure'
  if (mode === 'success') {
    await page.locator(`.area-${toGuessKey}`).click();
  }else{
    const wrongGuesses = await getRdmKeys(page, true, 3)
    for (let I = 0; I < wrongGuesses.length; I++) {
      await page.locator(`.area-${wrongGuesses[I]}`).click();
    }
  }

  const button = page.getByRole('button', {name: 'New Round'});
  await expect(button).toBeVisible();
  await expect(button).toBeEnabled();
});

Given('there is only one area left to guess', async ({ page }, arg: string) => {
  // Guess correctly until only one area left to guess
  let KVMap = new Map<string, string>(mockState[`${mockState.gameMode}LeftToGuess`])
  let toGuessKey: string;
  let button: Locator;
  while (KVMap.size > 1) {
    toGuessKey = await getToGuessKey(page)
    await page.locator(`.area-${toGuessKey}`).click();
    KVMap.delete(toGuessKey)
    button = page.getByRole('button', {name: 'New Round'});
    await button.click()
  }
});

When('I land on the game page', async ({ page }) => {
  await page.goto(url);
  await page.waitForLoadState('domcontentloaded');
  expect(await page.title()).toBe('Geoguesser Mini');
});

When('I click on {string}', async ({ page }, arg) => {
  const button = page.locator(`button:has-text("${arg}")`);
  await button.click();
  if (arg === 'New Round' || arg === 'Start Game') {
    mockState[`${mockState.gameMode}WrongGuessKeys`] = [];
  }
});

When('I hover over an area on the map', async ({ page }) => {
  mockState.hoverKey = (await getRdmKeys(page, true, 1))[0];
  
  // console.log(`Hovering over area with key: ${mockState.hoverKey}`);
  await page.locator(`.area-${mockState.hoverKey}`).hover();
});

When('I guess correctly', async ({ page }) => {
  const toGuess = mockState[`${mockState.gameMode}ToGuess`];
  const toGuessKey = await getToGuessKey(page);
  // console.log(`Guessing: ${toGuess} with key: ${toGuessKey}`);
  await page.locator(`.area-${toGuessKey}`).click();
});

When('I guess incorrectly', async ({ page }) => {
  const toGuess = await page.locator('.to-guess-name').textContent();
  let wrongGuessKey = (await getRdmKeys(page, true, 1))[0];
  // console.log(`Guessing: ${toGuess} with wrong key: ${wrongGuessKey}`);
  await page.locator(`.area-${wrongGuessKey}`).click();
  mockState[`${mockState.gameMode}WrongGuessKeys`].push(wrongGuessKey);
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

Then('area names should be hidden', async ({ page }) => {
  const layers = await page.locator('path').all();
  for (let i=0 ; i<layers.length; i++) {
    const l = layers[i];
    expect(await l.textContent()).toBe("");
  }
});

Then('the name of an area to guess should be displayed', async ({ page }) => {
  mockState[`${mockState.gameMode}ToGuess`] = await page.locator('.to-guess-name').textContent() || '';
  expect(await getToGuessKey(page)).not.toBe('-1');
});

Then('I should have a way to quit the game', async ({ page }) => {
  const button = page.getByRole('button', { name: 'Quit Game' })
  await expect(button).toBeVisible()
  await expect(button).toBeEnabled();
});

Then('the area should be highlighted without changing color', async ({ page }) => {
  const hoveredArea = page.locator(`.area-${mockState.hoverKey}`);
  expect(await hoveredArea.getAttribute('stroke-width')).toBe('3')
});

Then('I should see a message indicating the guess was correct', async ({ page }) => {
  const message = 'You guessed correctly !';
  expect(await page.locator(`text=${message}`).isVisible()).toBe(true);
});

Then('the correct area should be highlighted green on the map', async ({ page }) => {
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

Then('the area I selected should be highlighted red on the map', async ({ page }) => {
  const guessedRegion = await page.locator("[stroke='red']").count();
  expect(guessedRegion).toBeGreaterThan(0);
});

Then('I should not be able to make another guess', async ({ page }) => {
  const toGuess = await page.locator('.to-guess-name').textContent();

  let wrongGuessKey= (await getRdmKeys(page))[0];
  // console.log(`Guessing: ${toGuess} with wrong key: ${wrongGuessKey}`);
  const guessedArea = page.locator(`.area-${wrongGuessKey}`);
  await guessedArea.click();
  expect(await guessedArea.getAttribute('stroke')).toBe('blue');

  // make sure that the correct area also cannot be guessed
  const correctKey = await getToGuessKey(page);
  const correctArea = page.locator(`.area-${correctKey}`);
  if (await correctArea.getAttribute('stroke') === 'blue') {
    await correctArea.click();
    expect(await correctArea.getAttribute('stroke')).toBe('blue');
  }
});
 
Then('the correct area should be intermitentently highlighted on the map', async ({ page }) => {
  const toGuess = await page.locator('.to-guess-name').textContent();
  let correctKey = await getToGuessKey(page);
  // console.log(`correctKey: ${correctKey}, hoverKey: ${mockState.hoverKey}`);
  const correctArea = page.locator(`.area-${correctKey}`);
  expect(correctArea).toContainClass('failed');
});

Then('the area to guess should not have been already guessed', async ({ page }) => {
  // if getToGuessKey returns -1, it means the area to guess has already 
  // been deleted from the KVMap
  const toGuessKey = await getToGuessKey(page)
  expect(toGuessKey).not.toBe('-1')
});

Then('the red-highlighted areas should be reset', async ({ page }) => {
  const guessedArea = await page.locator("[stroke='red']").count();
  expect(guessedArea).toBe(0);
});

Then('the green-highlighted areas should stay the same', async ({ page }) => {
  const nbCorrectAreas = await page.locator("[stroke='green']").count();
  const nbTotalToGuess = mockState.gameMode == 'reg' ?
   regInitKVMap.size : dptInitKVMap.size;
  const nbLeftToGuess = mockState[`${mockState.gameMode}LeftToGuess`].size
  console.log(`nbCorrectAreas: ${nbCorrectAreas}, nbTotalToGuess: ${nbTotalToGuess}, nbLeftToGuess: ${nbLeftToGuess}`);
  expect(nbCorrectAreas).toBe(nbTotalToGuess-nbLeftToGuess);
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
