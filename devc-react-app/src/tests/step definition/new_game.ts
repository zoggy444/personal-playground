import {
    Given,
    When,
    Then,
  } from "@cucumber/cucumber";

  import { Page, Browser, chromium, expect } from "@playwright/test";

  let browser: Browser;
  let page: Page;

  Given("I am on the game board page", async function () {
    browser = await chromium.launch();
    page = await browser.newPage();
    await page.goto("http://localhost:3000");
  });