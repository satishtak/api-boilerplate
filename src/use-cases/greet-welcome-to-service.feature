Feature: greet welcome to app
  In order to check the server's status
  As a external entity
  I want to have server return me greeting message

  Scenario: A External entity seeks sever's status
    Given I have a service name
    When I called the function makeGreetWelcomeToApp
    Then It should return with greeting message
