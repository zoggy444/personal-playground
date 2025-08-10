Feature: Gameplay
    As a player
    I want to play the geoguesser mini game
    So that I can test my geographical knowledge about France regions and departments
    
    Scenario: Game page elements
        When I land on the game page
        Then I should see a title "Geoguesser Mini"
        And I should see a description "Welcome to Geoguesser Mini! Click the button below to start playing."
        And I should NOT see a map of France
        And I should see a way to select the game mode (regions or departments)
        And I should see a button to start the game

    Scenario: Start a new game
        Given I am on the game page
        When I click on "Start Game"
        Then A map of France with regions or department borders should be displayed
        And regions/departments names should be hidden
        And the name of a region/department to guess should be displayed

    Scenario: Guess correctly a location
        Given I am in a game
        When I make a correct guess on the map
        Then I should see a message indicating the guess was correct
        And the correct region/department should be highlighted green on the map
        And A new round button should be available to start the next round
    
    Scenario: Guess incorrectly a location
        Given I am in a game
        When I make an incorrect guess on the map
        Then I should see a message indicating the guess was incorrect
        And the region/department I selected should be highlighted red on the map

    Scenario: Guess incorrectly a location for the third time
        Given I am in a game
        And I have made two incorrect guesses
        When I make a third incorrect guess on the map
        Then I should see a message indicating the guess was incorrect
        And the region/department I selected should be highlighted red on the map
        And I should not be able to make another guess
        And A new round button should be available to start the next round
    
    Scenario: Start a new round
        Given The "new round" button is available
        When I click on "New Round"
        Then the name of a new region/department to guess should be displayed
        And the map should reset to its initial state
