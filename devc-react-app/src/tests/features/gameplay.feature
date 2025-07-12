Feature: Gameplay

  Scenario: Basic Arrow Right
    Given the board is
      | 2 | 0 | 4 | 0 |
      | 0 | 8 | 0 | 2 |
      | 0 | 0 | 0 | 0 |
      | 8 | 4 | 0 | 0 |
    When I press the right arrow key
    Then the board should be
      | * | * | 2 | 4 |
      | * | * | 8 | 2 |
      | * | * | * | * |
      | * | * | 8 | 4 |
    And a new 2 or 4 appears on the board

  Scenario: Basic Arrow Left
    Given the board is
      | 2 | 0 | 4 | 0 |
      | 0 | 8 | 0 | 2 |
      | 0 | 0 | 0 | 0 |
      | 8 | 4 | 0 | 0 |
    When I press the left arrow key
    Then the board should be
      | 2 | 4 | * | * |
      | 8 | 2 | * | * |
      | * | * | * | * |
      | 8 | 4 | * | * |
    And a new 2 or 4 appears on the board

  Scenario: Basic Arrow Up
    Given the board is
      | 2 | 0 | 4 | 0 |
      | 0 | 8 | 0 | 2 |
      | 0 | 0 | 0 | 0 |
      | 8 | 4 | 0 | 0 |
    When I press the up arrow key
    Then the board should be
      | 2 | 8 | 4 | 2 |
      | 8 | 4 | * | * |
      | * | * | * | * |
      | * | * | * | * |
    And a new 2 or 4 appears on the board

  Scenario: Basic Arrow Down
    Given the board is
      | 2 | 0 | 4 | 0 |
      | 0 | 8 | 0 | 2 |
      | 0 | 0 | 0 | 0 |
      | 8 | 4 | 0 | 0 |
    When I press the down arrow key
    Then the board should be
      | * | * | * | * |
      | * | * | * | * |
      | 2 | 8 | * | * |
      | 8 | 4 | 4 | 2 |
    And a new 2 or 4 appears on the board
    
    Scenario: Arrow right with merge
    Given the board is
      | 2 | 2 | 4 | 0 |
      | 0 | 8 | 0 | 2 |
      | 0 | 0 | 0 | 0 |
      | 8 | 4 | 0 | 0 |
    When I press the right arrow key
    Then the board should be
      | * | * | 4 | 4 |
      | * | * | 8 | 2 |
      | * | * | * | * |
      | * | * | 8 | 4 |
    And a new 2 or 4 appears on the board

  Scenario: Arrow left with merge
    Given the board is
      | 2 | 0 | 2 | 4 |
      | 0 | 8 | 0 | 2 |
      | 0 | 0 | 0 | 0 |
      | 8 | 4 | 0 | 0 |
    When I press the left arrow key
    Then the board should be
      | 4 | 4 | * | * |
      | 8 | 2 | * | * |
      | * | * | * | * |
      | 8 | 4 | * | * |
    And a new 2 or 4 appears on the board

  Scenario: Arrow up with merge
    Given the board is
      | 4 | 0 | 4 | 0 |
      | 4 | 8 | 0 | 2 |
      | 0 | 0 | 0 | 0 |
      | 8 | 4 | 0 | 0 |
    When I press the up arrow key
    Then the board should be
      | 8 | 8 | 4 | 2 |
      | 8 | 4 | * | * |
      | * | * | * | * |
      | * | * | * | * |
    And a new 2 or 4 appears on the board
