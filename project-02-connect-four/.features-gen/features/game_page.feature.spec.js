// Generated from: features\game_page.feature
import { test } from "../../features/steps/fixtures.ts";

test.describe('Game page', () => {

  test('Landing on the page', async ({ When, page, Then, And }) => { 
    await When('I land on the game page', null, { page }); 
    await Then('I should see a "Connect 4" title', null, { page }); 
    await And('I should see an empty 7x6 board', null, { page }); 
    await And('it should be player 1\'s turn', null, { page }); 
  });

  test('Player\'s turn', async ({ Given, page, When, Then }) => { 
    await Given('I am on the game page', null, { page }); 
    await When('I hover over a column', null, { page }); 
    await Then('the column should highlight', null, { page }); 
  });

  test('Player plays a coin', async ({ Given, page, When, And, Then }) => { 
    await Given('I am on the game page', null, { page }); 
    await When('I hover over a column that is not full', null, { page }); 
    await And('I click', null, { page }); 
    await Then('a coin of my color is dropped in the highlighted column', null, { page }); 
    await And('my turn ends', null, { page }); 
  });

  test('Player clicks on a column that is full', async ({ Given, page, When, And, Then }) => { 
    await Given('I am on the game page', null, { page }); 
    await When('I hover over a column that is full', null, { page }); 
    await And('I click', null, { page }); 
    await Then('nothing happens', null, { page }); 
    await And('I should still see my turn', null, { page }); 
  });

  test('Victory condition', async ({ Given, page, When, Then, And }) => { 
    await Given('I am on the game page', null, { page }); 
    await When('I connect four coins in a line', null, { page }); 
    await Then('I should see a message indicating that I won', null, { page }); 
    await And('the game should end', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use('features\\game_page.feature'),
  $bddFileData: ({}, use) => use(bddFileData),
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":3,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Action","textWithKeyword":"When I land on the game page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Outcome","textWithKeyword":"Then I should see a \"Connect 4\" title","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"And I should see an empty 7x6 board","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"And it should be player 1's turn","stepMatchArguments":[]}]},
  {"pwTestLine":13,"pickleLine":9,"tags":[],"steps":[{"pwStepLine":14,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"Given I am on the game page","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"When I hover over a column","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then the column should highlight","stepMatchArguments":[]}]},
  {"pwTestLine":19,"pickleLine":14,"tags":[],"steps":[{"pwStepLine":20,"gherkinStepLine":15,"keywordType":"Context","textWithKeyword":"Given I am on the game page","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"When I hover over a column that is not full","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"And I click","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"Then a coin of my color is dropped in the highlighted column","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"And my turn ends","stepMatchArguments":[]}]},
  {"pwTestLine":27,"pickleLine":21,"tags":[],"steps":[{"pwStepLine":28,"gherkinStepLine":22,"keywordType":"Context","textWithKeyword":"Given I am on the game page","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"When I hover over a column that is full","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":24,"keywordType":"Action","textWithKeyword":"And I click","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"Then nothing happens","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"And I should still see my turn","stepMatchArguments":[]}]},
  {"pwTestLine":35,"pickleLine":28,"tags":[],"steps":[{"pwStepLine":36,"gherkinStepLine":29,"keywordType":"Context","textWithKeyword":"Given I am on the game page","stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":30,"keywordType":"Action","textWithKeyword":"When I connect four coins in a line","stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"Then I should see a message indicating that I won","stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"And the game should end","stepMatchArguments":[]}]},
]; // bdd-data-end