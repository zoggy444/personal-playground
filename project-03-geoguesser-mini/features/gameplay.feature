Feature: Gameplay
    As a player
    I want to play the geoguesser mini game
    So that I can test my geographical knowledge about France regions and departments
    
    Scenario: Game page elements
        When I land on the game page
        Then I should see a title "Geoguesser Mini"
        And I should see a description "Welcome to Geoguesser Mini! Click the button below to start playing."
        And I should NOT see a map of France
        And I should see a way to select the game mode (region or department)
        And I should have a way to start a new game

    Scenario: Start a new game
        Given I am on the game page
        And I selected a game mode
        When I click on "Start Game"
        Then A map of France with region or department borders should be displayed
        And area names should be hidden
        And the name of an area to guess should be displayed
        And I should have a way to quit the game

    Scenario: Hover over an area
        Given I am in a game
        When I hover over an area on the map
        Then the area should be highlighted without changing color

    Scenario: Guess correctly a location
        Given I am in a game
        When I guess correctly
        Then I should see a message indicating the guess was correct
        And the correct area should be highlighted green on the map
        And A new round button should be available to start the next round
        And I should not be able to make another guess
    
    Scenario: Guess incorrectly a location
        Given I am in a game
        When I guess incorrectly
        Then I should see a message indicating the guess was incorrect
        And the area I selected should be highlighted red on the map

    Scenario: Guess incorrectly a location for the third time
        Given I am in a game
        And I have made two incorrect guesses
        When I guess incorrectly 
        Then I should see a message indicating that I lost the round
        And the area I selected should be highlighted red on the map
        And I should not be able to make another guess
        And A new round button should be available to start the next round
        And the correct area should be intermitentently highlighted on the map

    Scenario: Start a new round
        Given I am in a game
        And I succeeded or failed guessing an area
        When I click on "New Round"
        Then the name of an area to guess should be displayed
        And the area to guess should not have been already guessed
        And the red-highlighted areas should be reset
        And the green-highlighted areas should stay the same

    Scenario: Quit the game
        Given I am in a game
        When I quit the game
        Then I should land on the game settings

    Scenario: Win the game
        Given I am in a game
        And there is only one area left to guess
        When I guess correctly
        Then I should see a message indicating that I won the game
        And I should have a way to start a new game
