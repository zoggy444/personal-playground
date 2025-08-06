import { test, expect } from '@playwright/experimental-ct-react';
import App from './App';

test.describe("@winCondition : vertical", () => {

  test("Player 1 wins with vertical win, basic", async ({ mount }) => {
    const preBoardSet = [
      [0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 2],
      [0, 0, 0, 0, 2, 2],
      [0, 0, 0, 0, 1, 2],
      [0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 2],
      [0, 0, 0, 0, 0, 0],
    ];
    const component = await mount(<App preconfBoardSet={preBoardSet} />);
    const board = component.locator('div.game-board-container');
    
    // Simulate dropping a coin to complete the vertical line
    await board.locator('.column').nth(0).click(); // Column 0
    
    // Check if player 1 wins
    await expect(component).toContainText('Player 1 wins with a vertical win!');
  });
  
  test("Player 2 wins with vertical win, column with 1's coins under", async ({ mount }) => {
    const preBoardSet = [
      [0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 2],
      [0, 0, 0, 0, 1, 2],
      [0, 0, 2, 2, 2, 1],
      [0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0],
    ];
    const component = await mount(<App preconfBoardSet={preBoardSet} />);
    const board = component.locator('div.game-board-container');
    
    // Simulate dropping a coin to complete the vertical line
    await board.locator('.column').nth(4).click(); // Column 4
    
    // Check if player 1 wins
    await expect(component).toContainText('Player 2 wins with a vertical win!');
  });
  
  test("Player 1 wins with vertical win, column with 1's and 2's coins under", async ({ mount }) => {
    const preBoardSet = [
      [0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 2, 2, 2],
      [0, 0, 0, 0, 1, 2],
      [0, 0, 2, 2, 2, 1],
      [0, 1, 1, 1, 2, 1],
      [0, 0, 0, 0, 0, 2],
    ];
    const component = await mount(<App preconfBoardSet={preBoardSet} />);
    const board = component.locator('div.game-board-container');
    
    // Simulate dropping a coin to complete the vertical line
    await board.locator('.column').nth(5).click(); // Column 5
    
    // Check if player 1 wins
    await expect(component).toContainText('Player 1 wins with a vertical win!');
  });

})

test.describe("@winCondition : horizontal", () => {

  test("Player 2 wins with horizontal win, basic", async ({ mount }) => {
    const preBoardSet = [
      [0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 2],
      [0, 0, 0, 1, 1, 2],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 2],
      [0, 0, 0, 0, 0, 0],
    ];
    const component = await mount(<App preconfBoardSet={preBoardSet} />);
    const board = component.locator('div.game-board-container');
    
    // Simulate dropping a coin to complete the vertical line
    await board.locator('.column').nth(4).click(); // Column 0
    
    // Check if player 1 wins
    await expect(component).toContainText('Player 2 wins with a horizontal win!');
  });
  
  test("Player 2 wins with horizontal win, row with 1's coins on the left", async ({ mount }) => {
    const preBoardSet = [
      [0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 2, 1],
      [0, 0, 0, 2, 1, 2],
      [0, 0, 0, 2, 1, 2],
      [0, 0, 2, 2, 2, 1],
      [0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 0, 0],
    ];
    const component = await mount(<App preconfBoardSet={preBoardSet} />);
    const board = component.locator('div.game-board-container');
    
    // Simulate dropping a coin to complete the vertical line
    await board.locator('.column').nth(1).click(); // Column 4
    
    // Check if player 1 wins
    await expect(component).toContainText('Player 2 wins with a horizontal win!');
  });
  
  test("Player 1 wins with horizontal win, column with 1's and 2's coins on the right", async ({ mount }) => {
    const preBoardSet = [
      [0, 0, 1, 2, 1, 1],
      [0, 0, 0, 1, 2, 2],
      [0, 0, 1, 2, 2, 2],
      [0, 0, 1, 1, 1, 2],
      [0, 0, 2, 2, 2, 1],
      [0, 1, 1, 1, 2, 1],
      [2, 2, 1, 2, 1, 2],
    ];
    const component = await mount(<App preconfBoardSet={preBoardSet} />);
    const board = component.locator('div.game-board-container');
    
    // Simulate dropping a coin to complete the vertical line
    await board.locator('.column').nth(1).click(); // Column 4
    
    // Check if player 1 wins
    await expect(component).toContainText('Player 1 wins with a horizontal win!');
  });

})

test.describe("@winCondition : diagonal bottom-right top-left", () => {

  test("Player 1 wins with diagonal bottom-right top-left win, basic", async ({ mount }) => {
    const preBoardSet = [
      [0, 0, 2, 1, 1, 1],
      [0, 0, 0, 1, 2, 2],
      [0, 0, 0, 1, 2, 2],
      [0, 0, 0, 0, 1, 2],
      [0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 2],
      [0, 0, 0, 0, 0, 0],
    ];
    const component = await mount(<App preconfBoardSet={preBoardSet} />);
    const board = component.locator('div.game-board-container');
    
    // Simulate dropping a coin to complete the vertical line
    await board.locator('.column').nth(1).click(); // Column 0
    
    // Check if player 1 wins
    await expect(component).toContainText('Player 1 wins with a diagonal win!');
  });
  
  test("Player 2 wins with diagonal bottom-right top-left win, column with 1's coins under", async ({ mount }) => {
    const preBoardSet = [
      [0, 0, 0, 1, 1, 1],
      [0, 2, 1, 1, 2, 1],
      [0, 0, 0, 2, 1, 2],
      [0, 0, 2, 2, 1, 2],
      [0, 0, 2, 2, 2, 1],
      [0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 0, 0],
    ];
    const component = await mount(<App preconfBoardSet={preBoardSet} />);
    const board = component.locator('div.game-board-container');
    
    // Simulate dropping a coin to complete the vertical line
    await board.locator('.column').nth(2).click(); // Column 4
    
    // Check if player 1 wins
    await expect(component).toContainText('Player 2 wins with a diagonal win!');
  });
  
  test("Player 2 wins with diagonal bottom-right top-left win, column with 1's and 2's coins above", async ({ mount }) => {
    const preBoardSet = [
      [0, 1, 2, 1, 1, 1],
      [2, 1, 2, 1, 2, 2],
      [0, 1, 1, 2, 2, 2],
      [0, 0, 2, 2, 1, 2],
      [0, 0, 1, 2, 2, 1],
      [0, 1, 1, 1, 2, 1],
      [0, 0, 0, 0, 0, 0],
    ];
    const component = await mount(<App preconfBoardSet={preBoardSet} />);
    const board = component.locator('div.game-board-container');
    
    // Simulate dropping a coin to complete the vertical line
    await board.locator('.column').nth(6).click(); // Column 5
    
    // Check if player 1 wins
    await expect(component).toContainText('Player 2 wins with a diagonal win!');
  });

})

test.describe("@winCondition : diagonal bottom-left top-right", () => {

  test("Player 2 wins with diagonal bottom-left top-right win, basic", async ({ mount }) => {
    const preBoardSet = [
      [0, 0, 2, 1, 1, 1],
      [0, 0, 0, 1, 2, 2],
      [0, 0, 0, 1, 2, 2],
      [0, 0, 0, 0, 1, 2],
      [0, 0, 2, 2, 1, 1],
      [0, 0, 0, 1, 1, 2],
      [0, 0, 0, 0, 0, 0],
    ];
    const component = await mount(<App preconfBoardSet={preBoardSet} />);
    const board = component.locator('div.game-board-container');
    
    // Simulate dropping a coin to complete the vertical line
    await board.locator('.column').nth(3).click(); // Column 0
    
    // Check if player 1 wins
    await expect(component).toContainText('Player 2 wins with a diagonal win!');
  });
  
  test("Player 2 wins with diagonal bottom-left top-right win, column with 1's coins under", async ({ mount }) => {
    const preBoardSet = [
      [0, 0, 0, 1, 1, 1],
      [0, 2, 1, 1, 2, 1],
      [0, 0, 0, 2, 1, 2],
      [0, 0, 2, 2, 1, 2],
      [0, 0, 1, 2, 2, 1],
      [0, 0, 0, 0, 2, 1],
      [0, 0, 0, 0, 0, 0],
    ];
    const component = await mount(<App preconfBoardSet={preBoardSet} />);
    const board = component.locator('div.game-board-container');
    
    // Simulate dropping a coin to complete the vertical line
    await board.locator('.column').nth(4).click(); // Column 4
    
    // Check if player 1 wins
    await expect(component).toContainText('Player 2 wins with a diagonal win!');
  });
  
  test("Player 2 wins with diagonal bottom-left top-right win, column with 1's and 2's coins above", async ({ mount }) => {
    const preBoardSet = [
      [0, 1, 2, 1, 1, 2],
      [2, 1, 2, 1, 1, 2],
      [0, 1, 1, 2, 2, 2],
      [0, 0, 2, 2, 1, 1],
      [0, 2, 1, 2, 2, 2],
      [0, 1, 1, 1, 2, 1],
      [0, 0, 0, 0, 0, 1],
    ];
    const component = await mount(<App preconfBoardSet={preBoardSet} />);
    const board = component.locator('div.game-board-container');
    
    // Simulate dropping a coin to complete the vertical line
    await board.locator('.column').nth(5).click(); // Column 5
    
    // Check if player 1 wins
    await expect(component).toContainText('Player 2 wins with a diagonal win!');
  });

})
