@mysuzuki.prt
Feature: Create password request token
  In order to Create password request tokens
  As a client software developer
  I need to be able to create them through the API.

  Background:
    Given I load the fixtures
    And I add "Accept" header equal to "application/ld+json"

  Scenario: Create a token
    When I add "Authorization" header equal to "Bearer app-access-token"
    And I send a "POST" request to "/api/password-request-tokens" with body:
    """
    {
        email: "thibault@widop.com"
    }
    """
    Then the response status code should be 201
    And the response should be in JSON
    And the JSON should be equal to:
    """
    {
        "@context": "/api/contexts/PasswordRequestToken",
        "@type": "PasswordRequestToken",
        "expiresAt": 1528882358
    }
    """
    And the JSON node "@id" should not exist
    And the JSON node "token" should not exist

  Scenario Outline: Using invalid access token
    When I add "Authorization" header equal to "Bearer <access_token>"
    And I send a "POST" request to "/api/password-request-tokens"
    Then the response status code should be <status>

    Examples:
      | access_token         | status |
      | invalid-access-token | 401    |
      | user-access-token    | 403    |
