Feature: Register functionality

Scenario: Register should be Successful
    Given user navigates to the application
    And user click on the login link
    And user clicks on the Register button
    Then user provides the required fields
    # When user clicks the submit register button
    # Then register should be successful