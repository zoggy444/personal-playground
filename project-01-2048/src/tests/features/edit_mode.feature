Feature: Edit Mode

  Rule: The game has an edit mode that allows the player to modify the board.

    Scenario: Presence, in playing mode, of Edit Mode Button
      Given the game is in playing mode
      Then an "Edit Mode" button should be visible 

    Scenario: Enable Edit Mode
      Given the game is in playing mode
      When I press the "Edit Mode" button
      Then the board should be editable
    
    Scenario: Presence of buttons to get out of Edit Mode
      Given the game is in edit mode
      Then a "Save" button should be visible
      And a "Cancel" button should be visible
    
    Scenario: Save changes in Edit Mode
      Given the game is in edit mode
      When I modify the board
      And I press the "Save" button
      Then the board should reflect the changes made
      And the game should return to playing mode

    Scenario: Cancel changes in Edit Mode
      Given the game is in edit mode
      When I modify the board
      And I press the "Cancel" button
      Then the changes should be discarded
      And the game should return to playing mode
