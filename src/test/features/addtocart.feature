Feature: Add to cart functionality

Scenario: Add item to cart
    Given user navigates to the application
    And user click on the login link
    And user enters username as "yuvaraj2004"
    And user enters password as "ry@YUVI20"
    When user clicks on the login button
    Then Login should be successful
    Then user searches for item with name "<itemName>"
    When user adds item to cart
    Then item should be added to cart "<itemName>"

Examples:
    | itemName       |
    | "Rot & Ruin"   |
    | "Roomies"      |
 
