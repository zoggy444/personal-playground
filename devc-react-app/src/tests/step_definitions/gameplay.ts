import {
    Given,
    When,
    Then,
  } from "@cucumber/cucumber";

import { createRoot } from 'react-dom/client'

import { expect } from "@playwright/test";

import global from "../support/hooks.js"

import App from "../../App.tsx";

let page = global.page;


Given('the game board is', {timeout: 20 * 1000},  async function (dataTable) {
  const table = dataTable.raw();
  page.setContent('<div id="root"></div>');
  // Get the element handle
  const elementHandle = page.waitForSelector('#root');
  createRoot(await elementHandle).render(
      <App />
  )
});
