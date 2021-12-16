@mysuzuki.maintenance
Feature: Retrieve maintenances
  In order to retrieve maintenances
  As a client software developer
  I need to be able to retrieve them through the API.

  Background:
    Given I load the fixtures
    And I add "Accept" header equal to "application/ld+json"

  Scenario: Retrieve all maintenances
    When I add "Authorization" header equal to "Bearer user-access-token"
    And I send a "GET" request to "/api/vehicles/19UUB2F73FA074352/maintenances"
    Then the response status code should be 200
    And the response should be in JSON
    And the JSON nodes should be equal to:
      | @context | /api/contexts/Maintenance                    |
      | @id      | /api/vehicles/19UUB2F73FA074352/maintenances |
      | @type    | hydra:Collection                             |
    And the JSON node "hydra:totalItems" should match "/[0-9]+/"
    And the JSON node "hydra:member" should match:
    """
    {
      "@id": "@string@.startsWith('/api/maintenances/')",
      "@type": "Maintenance",
      "id": @integer@,
      "date": "@string@.isDateTime()",
      "type": "@string@",
      "place": "@string@",
      "vehicule": "/api/vehicles/19UUB2F73FA074352"
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



