@mysuzuki.staffsize
Feature: Retrieve staff sizes
  In order to retrieve staff sizes
  As a client software developer
  I need to be able to retrieve them through the API.

  Background:
    Given I execute the command "mysuzuki:dealership:update"
    And I add "Accept" header equal to "application/ld+json"

  Scenario: Retrieve all dealerships
    When I add "Authorization" header equal to "Bearer user-access-token"
    And I send a "GET" request to "/api/dealerships"
    Then the response status code should be 200
    And the response should be in JSON
    And the JSON nodes should be equal to:
      | @context | /api/contexts/StaffSize |
      | @id      | /api/staff-sizes        |
      | @type    | hydra:Collection |
    And the JSON node "hydra:totalItems" should match "/[0-9]+/"
    And the JSON node "hydra:member" should match:
    """
    {
      "@id": "@id": "@string@.matchRegex('/\\/api\\/staff-sizes\\/[0-9]+/')",
      "@type": "StaffSize",
      "id": @integer@,
      "label": "@string@"
    }
    """

  Scenario: Using bad HTTP method
    When I add "Authorization" header equal to "Bearer user-access-token"
    And I send a "POST" request to "/api/dealerships"
    Then the response status code should be 405

  Scenario Outline: Using invalid access token
    When I add "Authorization" header equal to "Bearer <access_token>"
    And I send a "GET" request to "/api/dealerships"
    Then the response status code should be <status>

    Examples:
      | access_token         | status |
      | invalid-access-token | 401    |
      | app-access-token     | 403    |
