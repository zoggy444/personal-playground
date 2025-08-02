Feature: Game page

  Scenario: Landing on the page
    When I land on the game page
    Then I should see a "Connect 4" title
    And I should see an empty 7x6 board
    And it should be player 1's turn

  Scenario: Player's turn
    Given I am on the game page
    When I hover over a column
    Then the column should highlight

  Scenario: Player plays a coin
    Given I am on the game page
    When I hover over a column
    And I click
    Then a coin of my color is dropped in the highlighted column
    And my turn ends
