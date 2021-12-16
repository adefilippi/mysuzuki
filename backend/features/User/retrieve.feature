@mysuzuki.user
Feature: Manage users
  In order to manage users
  As a client software developer
  I need to be able to retrieve them through the API.

  Background:
    Given I load the fixtures
    And I add "Accept" header equal to "application/ld+json"

  Scenario: Retrieve current user
    When I add "Authorization" header equal to "Bearer user-access-token"
    And I send a "GET" request to "/api/users/current"
    Then the response status code should be 200
    And the response should be in JSON
    And the JSON should be equal to:
    """
    {
      "@context": "/api/contexts/User",
      "@id": "/api/users/current",
      "@type": "User",
      "last_name": "@string@",
      "email": "@string@.isEmail()",
      "roles": [
        "ROLE_USER"
      ]
    }
    """

  Scenario: Retrieve current user using invalid access token
    When I add "Authorization" header equal to "Bearer invalid-user-access-token"
    And I send a "GET" request to "/api/users/current"
    Then the response status code should be 401
    And the response should be in JSON
    And the JSON should be equal to:
    """
    {
      "error": "invalid_grant",
      "error_description": "The access token provided is invalid."
    }
    """

  Scenario: Retrieve current user using app access token
    When I add "Authorization" header equal to "Bearer app-access-token"
    And I send a "GET" request to "/api/users/current"
    Then the response status code should be 404
    And the response should be in JSON

  Scenario: Retrieve current user without specifying the "Authorization" header
    When I send a "GET" request to "/api/users/current"
    Then the response status code should be 401
    And the response should be in JSON
    And the JSON should be equal to:
    """
    {
      "error": "access_denied",
      "error_description": "OAuth2 authentication required"
    }
    """
