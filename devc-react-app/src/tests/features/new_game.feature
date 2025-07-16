Feature: New Game Button

  Scenario: New Game button is visible
    Given I am on the game board page
    Then I should see a 'NEW GAME' button
    And the button should be enabled

  Scenario: User clicks on the New Game button
    Given I am on the game board page
    When I click on the 'NEW GAME' button
    Then the game board should be
      | 0 | 2 | 2 | 0 |
      | 0 | 0 | 0 | 0 |
      | 0 | 0 | 0 | 0 |
      | 0 | 0 | 0 | 0 |
