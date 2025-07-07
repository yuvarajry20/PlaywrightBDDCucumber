Feature: User Authentication tests

Background:
  Given user navigates to the application
  And user click on the login link

Scenario: Login Should be Successful
    Given user enters username as "yuvaraj2004"
    And user enters password as "ry@YUVI20"
    When user clicks on the login button
    Then Login should be successful

Scenario: Login Should not be Successful
    Given user enters username as "yuvaraj2004"
    And user enters password as "YUVI20"
    When user clicks on the login button
    Then Login should Fail

