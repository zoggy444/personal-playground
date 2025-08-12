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
        And I should see a button to start the game

    Scenario: Start a new game
        Given I am on the game page
        When I click on "Start Game"
        Then A map of France with region or department borders should be displayed
        And region/department names should be hidden
        And the name of a region/department to guess should be displayed

    Scenario: Hover over a region/department
        Given I am in a game
        When I hover over a region/department on the map
        Then the region/department should be highlighted without changing color

    Scenario: Guess correctly a location
        Given I am in a game
        When I make a correct guess on the map
        Then I should see a message indicating the guess was correct
        And the correct region/department should be highlighted green on the map
        And A new round button should be available to start the next round
        And I should not be able to make another guess
    
    Scenario: Guess incorrectly a location
        Given I am in a game
        When I make an incorrect guess on the map
        Then I should see a message indicating the guess was incorrect
        And the region/department I selected should be highlighted red on the map

    Scenario: Guess incorrectly a location for the third time
        Given I am in a game
        And I have made two incorrect guesses
        When I make a third incorrect guess on the map
        Then I should see a message indicating that I lost the round
        And the region/department I selected should be highlighted red on the map
        And I should not be able to make another guess
        And A new round button should be available to start the next round
        And the correct region/department should be intermitentently highlighted on the map

    Scenario: Start a new round
        Given I am in a game
        And The "New Round" button is available
        When I click on "New Round"
        Then the name of a region/department to guess should be displayed
        And the map should reset to its initial state
