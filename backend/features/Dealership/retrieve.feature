@mysuzuki.dealership
Feature: Retrieve dealerships
  In order to retrieve dealerships
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
    | @context | /api/contexts/Dealership |
    | @id | /api/dealerships |
    | @type | hydra:Collection |
    And the JSON node "hydra:totalItems" should match "/[0-9]+/"
    And the JSON node "hydra:member" should match:
    """
    {
        "@id": "@string@.matchRegex('/\\/api\\/dealerships\\/[0-9]{4}[a-z]/')",
        "@type": "Dealership",
        "external_id": "@string@.isNotEmpty()",
        "name": "@string@.isNotEmpty()",
        "address": {
            "street": "@string@.isNotEmpty()",
            "additional1": "@string@.optional()",
            "additional2": "@string@.optional()",
            "zipCode": "@string@.isNotEmpty()",
            "city": "@string@.isNotEmpty()"
        },
        "phone": "@*@",
        "fax": "@*@",
        "email": "@string@.isEmail()",
        "coordinates": {
            "latitude": "@*@",
            "longitude": "@*@"
        }
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
        | access_token | status |
        | invalid-access-token | 401 |
        | app-access-token | 403 |



