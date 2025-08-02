"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const fixtures_js_1 = require("./fixtures.js");
let columnCurrent = 0;
let playerCurrent = 0;
(0, fixtures_js_1.Given)('I am on the game page', async ({ page }) => {
    await page.goto('https://ominous-carnival-ppj9rx5rvpw376r4-5173.app.github.dev/');
    await page.waitForLoadState('domcontentloaded');
});
(0, fixtures_js_1.When)('I land on the game page', async ({ page }) => {
    console.log("When I land");
    await page.goto('https://ominous-carnival-ppj9rx5rvpw376r4-5173.app.github.dev/');
});
(0, fixtures_js_1.When)('I hover over a column', async ({ page }) => {
    columnCurrent = Math.floor(Math.random() * 7); // Randomly select a column from 0 to 6
    const column = page.locator('.column').nth(columnCurrent);
    await column.hover();
    //await expect(column).toHaveClass('highlighted'); // Assuming the column gets a 'highlighted' class on hover
});
(0, fixtures_js_1.When)('I click', async ({ page }) => {
    const column = page.locator('.highlighted');
    await column.click();
});
(0, fixtures_js_1.Then)('I should see a "Connect 4" title', async ({ page }) => {
    const h1 = page.locator(`h1:has-text("Connect 4")`);
    await (0, test_1.expect)(h1).toBeVisible();
});
(0, fixtures_js_1.Then)('I should see an empty 7x6 board', async ({ page }) => {
    const columns = page.locator(`.column`);
    await (0, test_1.expect)(columns).toHaveCount(7);
    const slots = page.locator(`.slot`);
    await (0, test_1.expect)(slots).toHaveCount(42);
});
(0, fixtures_js_1.Then)("it should be player 1's turn", async ({ page }) => {
    const h2 = page.locator(`h2:has-text("Player 1's turn")`);
    playerCurrent = 1;
    await (0, test_1.expect)(h2).toBeVisible();
});
(0, fixtures_js_1.Then)('the column should highlight', async ({ page }) => {
    const column = page.locator('.column').nth(columnCurrent);
    await (0, test_1.expect)(column).toHaveClass(/highlighted/);
});
(0, fixtures_js_1.Then)('a coin of my color is dropped in the highlighted column', async ({}) => {
    // Step: Then a coin of my color is dropped in the highlighted column
    // From: features/game_page.feature:18:5
});
(0, fixtures_js_1.Then)('my turn ends', async ({ page }) => {
    if (playerCurrent === 1) {
        const h2 = page.locator(`h2:has-text("Player 1's turn")`);
        playerCurrent = 1;
        await (0, test_1.expect)(h2).toBeVisible();
    }
    else if (playerCurrent === 2) {
        const h2 = page.locator(`h2:has-text("Player 1's turn")`);
        playerCurrent = 1;
        await (0, test_1.expect)(h2).toBeVisible();
    }
    else {
        throw new Error;
    }
});
