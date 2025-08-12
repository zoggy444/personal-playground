// Generated from: features/gameplay.feature
import { test } from "../../features/steps/fixtures.ts";

test.describe('Gameplay', () => {

  test('Game page elements', async ({ When, page, Then, And }) => { 
    await When('I land on the game page', null, { page }); 
    await Then('I should see a title "Geoguesser Mini"', null, { page }); 
    await And('I should see a description "Welcome to Geoguesser Mini! Click the button below to start playing."', null, { page }); 
    await And('I should NOT see a map of France', null, { page }); 
    await And('I should see a way to select the game mode (region or department)', null, { page }); 
    await And('I should see a button to start the game', null, { page }); 
  });

  test('Start a new game', async ({ Given, page, When, Then, And }) => { 
    await Given('I am on the game page', null, { page }); 
    await When('I click on "Start Game"', null, { page }); 
    await Then('A map of France with region or department borders should be displayed', null, { page }); 
    await And('region/department names should be hidden', null, { page }); 
    await And('the name of a region/department to guess should be displayed', null, { page }); 
  });

  test('Hover over a region/department', async ({ Given, page, When, Then }) => { 
    await Given('I am in a game', null, { page }); 
    await When('I hover over a region/department on the map', null, { page }); 
    await Then('the region/department should be highlighted without changing color', null, { page }); 
  });

  test('Guess correctly a location', async ({ Given, page, When, Then, And }) => { 
    await Given('I am in a game', null, { page }); 
    await When('I make a correct guess on the map', null, { page }); 
    await Then('I should see a message indicating the guess was correct', null, { page }); 
    await And('the correct region/department should be highlighted green on the map', null, { page }); 
    await And('A new round button should be available to start the next round', null, { page }); 
    await And('I should not be able to make another guess', null, { page }); 
  });

  test('Guess incorrectly a location', async ({ Given, page, When, Then, And }) => { 
    await Given('I am in a game', null, { page }); 
    await When('I make an incorrect guess on the map', null, { page }); 
    await Then('I should see a message indicating the guess was incorrect', null, { page }); 
    await And('the region/department I selected should be highlighted red on the map', null, { page }); 
  });

  test('Guess incorrectly a location for the third time', async ({ Given, page, And, When, Then }) => { 
    await Given('I am in a game', null, { page }); 
    await And('I have made two incorrect guesses', null, { page }); 
    await When('I make a third incorrect guess on the map', null, { page }); 
    await Then('I should see a message indicating that I lost the round', null, { page }); 
    await And('the region/department I selected should be highlighted red on the map', null, { page }); 
    await And('I should not be able to make another guess', null, { page }); 
    await And('A new round button should be available to start the next round', null, { page }); 
    await And('the correct region/department should be intermitentently highlighted on the map', null, { page }); 
  });

  test('Start a new round', async ({ Given, page, And, When, Then }) => { 
    await Given('I am in a game', null, { page }); 
    await And('The "New Round" button is available', null, { page }); 
    await When('I click on "New Round"', null, { page }); 
    await Then('the name of a region/department to guess should be displayed', null, { page }); 
    await And('the map should reset to its initial state', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use('features/gameplay.feature'),
  $bddFileData: ({}, use) => use(bddFileData),
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":6,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When I land on the game page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then I should see a title \"Geoguesser Mini\"","stepMatchArguments":[{"group":{"start":21,"value":"\"Geoguesser Mini\"","children":[{"start":22,"value":"Geoguesser Mini","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"And I should see a description \"Welcome to Geoguesser Mini! Click the button below to start playing.\"","stepMatchArguments":[{"group":{"start":27,"value":"\"Welcome to Geoguesser Mini! Click the button below to start playing.\"","children":[{"start":28,"value":"Welcome to Geoguesser Mini! Click the button below to start playing.","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":10,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"And I should NOT see a map of France","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"And I should see a way to select the game mode (region or department)","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"And I should see a button to start the game","stepMatchArguments":[]}]},
  {"pwTestLine":15,"pickleLine":14,"tags":[],"steps":[{"pwStepLine":16,"gherkinStepLine":15,"keywordType":"Context","textWithKeyword":"Given I am on the game page","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"When I click on \"Start Game\"","stepMatchArguments":[{"group":{"start":11,"value":"\"Start Game\"","children":[{"start":12,"value":"Start Game","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":18,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"Then A map of France with region or department borders should be displayed","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"And region/department names should be hidden","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"And the name of a region/department to guess should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":23,"pickleLine":21,"tags":[],"steps":[{"pwStepLine":24,"gherkinStepLine":22,"keywordType":"Context","textWithKeyword":"Given I am in a game","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"When I hover over a region/department on the map","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Then the region/department should be highlighted without changing color","stepMatchArguments":[]}]},
  {"pwTestLine":29,"pickleLine":26,"tags":[],"steps":[{"pwStepLine":30,"gherkinStepLine":27,"keywordType":"Context","textWithKeyword":"Given I am in a game","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"When I make a correct guess on the map","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Then I should see a message indicating the guess was correct","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"And the correct region/department should be highlighted green on the map","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"And A new round button should be available to start the next round","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"And I should not be able to make another guess","stepMatchArguments":[]}]},
  {"pwTestLine":38,"pickleLine":34,"tags":[],"steps":[{"pwStepLine":39,"gherkinStepLine":35,"keywordType":"Context","textWithKeyword":"Given I am in a game","stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":36,"keywordType":"Action","textWithKeyword":"When I make an incorrect guess on the map","stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":37,"keywordType":"Outcome","textWithKeyword":"Then I should see a message indicating the guess was incorrect","stepMatchArguments":[]},{"pwStepLine":42,"gherkinStepLine":38,"keywordType":"Outcome","textWithKeyword":"And the region/department I selected should be highlighted red on the map","stepMatchArguments":[]}]},
  {"pwTestLine":45,"pickleLine":40,"tags":[],"steps":[{"pwStepLine":46,"gherkinStepLine":41,"keywordType":"Context","textWithKeyword":"Given I am in a game","stepMatchArguments":[]},{"pwStepLine":47,"gherkinStepLine":42,"keywordType":"Context","textWithKeyword":"And I have made two incorrect guesses","stepMatchArguments":[]},{"pwStepLine":48,"gherkinStepLine":43,"keywordType":"Action","textWithKeyword":"When I make a third incorrect guess on the map","stepMatchArguments":[]},{"pwStepLine":49,"gherkinStepLine":44,"keywordType":"Outcome","textWithKeyword":"Then I should see a message indicating that I lost the round","stepMatchArguments":[]},{"pwStepLine":50,"gherkinStepLine":45,"keywordType":"Outcome","textWithKeyword":"And the region/department I selected should be highlighted red on the map","stepMatchArguments":[]},{"pwStepLine":51,"gherkinStepLine":46,"keywordType":"Outcome","textWithKeyword":"And I should not be able to make another guess","stepMatchArguments":[]},{"pwStepLine":52,"gherkinStepLine":47,"keywordType":"Outcome","textWithKeyword":"And A new round button should be available to start the next round","stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":48,"keywordType":"Outcome","textWithKeyword":"And the correct region/department should be intermitentently highlighted on the map","stepMatchArguments":[]}]},
  {"pwTestLine":56,"pickleLine":50,"tags":[],"steps":[{"pwStepLine":57,"gherkinStepLine":51,"keywordType":"Context","textWithKeyword":"Given I am in a game","stepMatchArguments":[]},{"pwStepLine":58,"gherkinStepLine":52,"keywordType":"Context","textWithKeyword":"And The \"New Round\" button is available","stepMatchArguments":[{"group":{"start":4,"value":"\"New Round\"","children":[{"start":5,"value":"New Round","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":59,"gherkinStepLine":53,"keywordType":"Action","textWithKeyword":"When I click on \"New Round\"","stepMatchArguments":[{"group":{"start":11,"value":"\"New Round\"","children":[{"start":12,"value":"New Round","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":60,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"Then the name of a region/department to guess should be displayed","stepMatchArguments":[]},{"pwStepLine":61,"gherkinStepLine":55,"keywordType":"Outcome","textWithKeyword":"And the map should reset to its initial state","stepMatchArguments":[]}]},
]; // bdd-data-end