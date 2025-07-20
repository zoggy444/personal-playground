Feature: Gameplay

  Rules:
    * The game board is a 4x4 grid.
    * The player can move tiles using arrow keys.
    * Tiles with the same number merge when they collide.
    * A new tile (2 or 4) appears after each move.
    * If no tile can move in the direction of the arrow key pressed, no new tile appears.
    * If no tile can move in any direction, the game is over.
  
  Rule: The player can move tiles using arrow keys.

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

  Rule: Tiles with the same number merge when they collide.

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

    Scenario: Arrow down with merge
      Given the board is
        | 4 | 0 | 4 | 0 |
        | 2 | 8 | 0 | 2 |
        | 0 | 0 | 0 | 0 |
        | 4 | 4 | 4 | 0 |
      When I press the down arrow key
      Then the board should be
        | * | * | * | * |
        | 4 | * | * | * |
        | 2 | 8 | * | * |
        | 4 | 4 | 8 | 2 |
      And a new 2 or 4 appears on the board

  Rule: If no tile can move in the direction of the arrow key pressed, no new tile appears.

    Scenario: No movement with arrow right
      Given the board is
        | 4 | 2 | 4 | 2 |
        | 0 | 0 | 0 | 2 |
        | 0 | 0 | 0 | 0 |
        | 0 | 2 | 8 | 4 |
      When I press the right arrow key
      Then the board should be unchanged
      And no new tile appears on the board

    Scenario: No movement with arrow left
      Given the board is
        | 8 | 2 | 4 | 0 |
        | 0 | 0 | 0 | 0 |
        | 8 | 0 | 0 | 0 |
        | 4 | 8 | 0 | 0 |
      When I press the left arrow key
      Then the board should be unchanged
      And no new tile appears on the board

    Scenario: No movement with arrow up
      Given the board is
        | 0 | 2 | 4 | 4 |
        | 0 | 8 | 8 | 2 |
        | 0 | 2 | 0 | 0 |
        | 0 | 4 | 0 | 0 |
      When I press the up arrow key
      Then the board should be unchanged
      And no new tile appears on the board

    Scenario: No movement with arrow down
      Given the board is
        | 0 | 0 | 0 | 4 |
        | 0 | 0 | 0 | 8 |
        | 0 | 4 | 0 | 2 |
        | 0 | 2 | 8 | 4 |
      When I press the down arrow key
      Then the board should be unchanged
      And no new tile appears on the board
  
  Rule: If no tile can move in any direction, the game is over.
  
    Scenario: Game over
      Given the board is
        | 0 | 8 | 64 | 32 |
        | 16 | 32 | 16 | 8 |
        | 8 | 16 | 2 | 4 |
        | 32 | 8 | 4 | 2 |
      When I press the left arrow key
      Then the board should be
        | 8 | 64 | 32 | * |
        | 16 | 32 | 16 | 8 |
        | 8 | 16 | 2 | 4 |
        | 32 | 8 | 4 | 2 |
      And a new 2 or 4 appears on the last available spot
      And the game should be over