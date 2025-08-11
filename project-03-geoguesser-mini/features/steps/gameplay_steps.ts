import { expect } from '@playwright/test';
import { Given, When, Then } from './fixtures.js';

import departmentsData from '../../data/departements-version-simplifiee.json' with { type: "json" };
import regionData from '../../data/regions-version-simplifiee.json';
import type { GeoJsonObject } from 'geojson';

import regionGeoJson from '../../data/geojson_data';

const url = process.env.BASE_URL || 'https://ominous-carnival-ppj9rx5rvpw376r4-5173.app.github.dev/';

let gameMode = 'regions'; // Default game mode

// @todo: randomize game mode selection and place to guess

Given('I am on the game page', async ({ page }) => {
  await page.goto(url);
  await page.waitForLoadState('domcontentloaded');
  expect(await page.title()).toBe('Geoguesser Mini');
});

Given('the {string} game mode is selected', async ({ page }, arg) => {
  console.log("Step yet to be implemented");
});

Given('I am in a game', async ({ page }) => {
  await page.goto(url);
  await page.waitForLoadState('domcontentloaded');
  expect(await page.title()).toBe('Geoguesser Mini');
  await page.click('button:has-text("Start Game")');
  await page.waitForSelector('.leaflet-container'); // Wait for the map to load
  gameMode = 'regions';
  expect(await page.locator('.leaflet-container').isVisible()).toBe(true);
  expect(await page.locator('.to-guess-name').isVisible()).toBe(true);
});

Given('I have made two incorrect guesses', async ({ page }) => {
  const toGuess = await page.locator('.to-guess-name').textContent();
  let guessedKeys: string[] = [];
  // Take the first 3 to guess to make sure at least 2 are wrong
  if (gameMode === 'regions') {
    guessedKeys = [...regionGeoJson.entries()]
      .slice(0, 3) 
      .filter(({ 1: v }) => v.name !== toGuess)
      .map(([k]) => k)
      .slice(0, 2);
  }else if (gameMode === 'departments') {
    guessedKeys = departmentsData.features
      .slice(0, 3) 
      .filter(feature => feature.properties.nom !== toGuess)
      .map(feature => feature.properties.code)
      .slice(0, 2);
  }
  console.log(`Guessing: ${toGuess} with wrong keys: ${guessedKeys}`);
  if (gameMode === 'regions') {
    await page.locator(`.region-${guessedKeys[0]}`).click();
    await page.locator(`.region-${guessedKeys[1]}`).click();
  } else if (gameMode === 'departments') {
    await page.locator(`.department-${guessedKeys[0]}`).click();
    await page.locator(`.department-${guessedKeys[1]}`).click();
  }
});

Given('The {string} button is available', async ({ page }, arg: string) => {
  const toGuess = await page.locator('.to-guess-name').textContent();
  // make both an incorrect and a correst guess to ensure both red and green highlight are reset
  let guessedKey: string = '';
  // Take the first 2 to guess to make sure at least one is wrong
  if (gameMode === 'regions') {
    guessedKey = [...regionGeoJson.entries()]
      .slice(0, 2) 
      .filter(({ 1: v }) => v.name !== toGuess)
      .map(([k]) => k)[0];
  }else if (gameMode === 'departments') {
    guessedKey = departmentsData.features
      .slice(0, 2) 
      .filter(feature => feature.properties.nom !== toGuess)
      .map(feature => feature.properties.code)[0];
  }
  console.log(`Guessing: ${toGuess} with wrong key: ${guessedKey}`);
  if (gameMode === 'regions') {
    await page.locator(`.region-${guessedKey}`).click();
  } else if (gameMode === 'departments') {
    await page.locator(`.department-${guessedKey}`).click();
  }
  
  let toGuessKey: string = '';
  if (gameMode === 'regions') {
    toGuessKey = [...regionGeoJson.entries()]
      .filter(({ 1: v }) => v.name === toGuess)
      .map(([k]) => k)[0];
  }else if (gameMode === 'departments') {
    toGuessKey = departmentsData.features
      .filter(feature => feature.properties.nom === toGuess)
      .map(feature => feature.properties.code)[0];
  }
  console.log(`Guessing: ${toGuess} with key: ${toGuessKey}`);
  if (gameMode === 'regions') {
    await page.locator(`.region-${toGuessKey}`).click();
  } else if (gameMode === 'departments') {
    await page.locator(`.department-${toGuessKey}`).click();
  }
  const button = page.locator(`button:has-text("${arg}")`);
  await expect(button).toBeVisible();
  await expect(button).toBeEnabled();
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

When('I make a correct guess on the map', async ({ page }) => {
  const toGuess = await page.locator('.to-guess-name').textContent();
  let toGuessKey: string = '';
  if (gameMode === 'regions') {
    toGuessKey = [...regionGeoJson.entries()]
      .filter(({ 1: v }) => v.name === toGuess)
      .map(([k]) => k)[0];
  }else if (gameMode === 'departments') {
    toGuessKey = departmentsData.features
      .filter(feature => feature.properties.nom === toGuess)
      .map(feature => feature.properties.code)[0];
  }
  console.log(`Guessing: ${toGuess} with key: ${toGuessKey}`);
  if (gameMode === 'regions') {
    await page.locator(`.region-${toGuessKey}`).click();
  } else if (gameMode === 'departments') {
    await page.locator(`.department-${toGuessKey}`).click();
  }
});

When('I make an incorrect guess on the map', async ({ page }) => {
  const toGuess = await page.locator('.to-guess-name').textContent();
  let guessedKey: string = '';
  // Take the first 2 to guess to make sure at least one is wrong
  if (gameMode === 'regions') {
    guessedKey = [...regionGeoJson.entries()]
      .slice(0, 2) 
      .filter(({ 1: v }) => v.name !== toGuess)
      .map(([k]) => k)[0];
  }else if (gameMode === 'departments') {
    guessedKey = departmentsData.features
      .slice(0, 2) 
      .filter(feature => feature.properties.nom !== toGuess)
      .map(feature => feature.properties.code)[0];
  }
  console.log(`Guessing: ${toGuess} with wrong key: ${guessedKey}`);
  if (gameMode === 'regions') {
    await page.locator(`.region-${guessedKey}`).click();
  } else if (gameMode === 'departments') {
    await page.locator(`.department-${guessedKey}`).click();
  }
});

When('I make a third incorrect guess on the map', async ({ page }) => {
  const toGuess = await page.locator('.to-guess-name').textContent();
  let guessedKeys: string[] = [''];
  // Take the last 4 to guess to make sure at least 3 are wrong
  // pick the third one so it hasn't already been guessed earlier
  if (gameMode === 'regions') {
    guessedKeys = [...regionGeoJson.entries()]
      .slice(0, 4) 
      .filter(({ 1: v }) => v.name !== toGuess)
      .map(([k]) => k)
      .slice(0, 3)
  }else if (gameMode === 'departments') {
    guessedKeys = departmentsData.features
      .slice(0, 4) 
      .filter(feature => feature.properties.nom !== toGuess)
      .map(feature => feature.properties.code)
      .slice(0, 3);
  }
  console.log(`third guessGuessing: ${toGuess} with wrong key: ${guessedKeys[2]}`);
  if (gameMode === 'regions') {
    await page.locator(`.region-${guessedKeys[2]}`).click();
  } else if (gameMode === 'departments') {
    await page.locator(`.department-${guessedKeys[2]}`).click();
  }
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

Then('A map of France with regions or department borders should be displayed', async ({ page }) => {
  const map = page.locator('.leaflet-container');
  await expect(map).toBeVisible();
  const area = await page.locator('path.leaflet-interactive').count();
  expect(area).toBeGreaterThan(0);
});

Then('regions\\/departments names should be hidden', async ({ page }) => {
  const map = page.locator('.leaflet-container');
  expect(await map.getByText('Ain').count()).toBe(0);
  expect(await map.getByText('Bretagne').count()).toBe(0);
});

Then('the name of a region\\/department to guess should be displayed', async ({ page }) => {
  const name = await page.locator('.to-guess-name').textContent();
  expect(name).not.toBeNull();
});

Then('I should see a message indicating the guess was correct', async ({ page }) => {
  const message = 'You guessed correctly !';
  expect(await page.locator(`text=${message}`).isVisible()).toBe(true);
});

Then('the correct region\\/department should be highlighted green on the map', async ({ page }) => {
  const guessedRegion = await page.locator("[stroke='green']").count();
  expect(guessedRegion).toBeGreaterThan(0);
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
  let guessedKey: string = '';
  // Take the first 5 to guess to make sure at least 4 are wrong
  // and take the 4th one so it hasn't already been guessed earlier
  if (gameMode === 'regions') {
    guessedKey = [...regionGeoJson.entries()]
      .slice(0, 5) 
      .filter(({ 1: v }) => v.name !== toGuess)
      .map(([k]) => k)
      .slice(0,4)[3];
  }else if (gameMode === 'departments') {
    guessedKey = departmentsData.features
      .slice(0, 5) 
      .filter(feature => feature.properties.nom !== toGuess)
      .map(feature => feature.properties.code)
      .slice(0, 4)[3];
  }
  console.log(`Guessing: ${toGuess} with wrong key: ${guessedKey}`);
  if (gameMode === 'regions') {
    const guessedRegion = page.locator(`.region-${guessedKey}`);
    await guessedRegion.click();
    console.log(await guessedRegion.count());
    console.log(await guessedRegion.getAttribute('stroke'));
    expect(await guessedRegion.getAttribute('stroke')).toBe('blue');
  } else if (gameMode === 'departments') {
    const guessedDepartment = page.locator(`.department-${guessedKey}`);
    await guessedDepartment.click();
    expect(await guessedDepartment.getAttribute('stroke')).toBe('blue');
  }
});

Then('the correct region\\/department should be intermitentently highlighted in green on the map', async ({ page }) => {
  const toGuess = await page.locator('.to-guess-name').textContent();
  let toGuessKey: string = '';
  if (gameMode === 'regions') {
    toGuessKey = [...regionGeoJson.entries()]
      .filter(({ 1: v }) => v.name === toGuess)
      .map(([k]) => k)[0];
  }else if (gameMode === 'departments') {
    toGuessKey = departmentsData.features
      .filter(feature => feature.properties.nom === toGuess)
      .map(feature => feature.properties.code)[0];
  }
  const toGuessColor = await page.locator(`.region-${toGuessKey}, .department-${toGuessKey}`).getAttribute('stroke');
  await page.waitForTimeout(2000);
  const newToGuessColor = await page.locator(`.region-${toGuessKey}, .department-${toGuessKey}`).getAttribute('stroke');
  console.log(`toGuessColor: ${toGuessColor}, newToGuessColor: ${newToGuessColor}`);
  expect(toGuessColor).not.toBe(newToGuessColor);
  // Either the initial or the new color should be green
  expect(toGuessColor).toBe(/green|blue/);
  expect(newToGuessColor).toBe(/green|blue/);
});

Then('the map should reset to its initial state', async ({ page }) => {
  const guessedRegion = await page.locator("[stroke='green']").count();
  expect(guessedRegion).toBe(0);
  const guessedIncorrectRegion = await page.locator("[stroke='red']").count();
  expect(guessedIncorrectRegion).toBe(0);
  console.log(await page.locator("[stroke='blue']").count())
});
