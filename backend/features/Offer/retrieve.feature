@mysuzuki.offer
Feature: Retrieve offers
  In order to retrieve offers
  As a client software developer
  I need to be able to retrieve them through the API.

  Background:
    Given I load the fixtures
    And I add "Accept" header equal to "application/ld+json"

  Scenario: Retrieve all offers
    When I add "Authorization" header equal to "Bearer user-access-token"
    And I send a "GET" request to "/api/offers"
    Then the response status code should be 200
    And the response should be in JSON
    And the JSON nodes should be equal to:
      | @context | /api/contexts/Offer |
      | @id | /api/offers |
      | @type | hydra:Collection |
    And the JSON node "hydra:totalItems" should match "/[0-9]+/"
    And the JSON node "hydra:member" should match:
    """
    {
        "@id": "@string@.matchRegex('/\\/api\\/offers\\/[0-9]+/')",
        "@type": "Offer",
        "id": @integer@,
        "title": "@string@.isNotEmpty()",
        "start_date": "@string@.isDateTime()",
        "end_date": "@string@.isDateTime()",
        "type": "@string@.isNotEmpty()",
        "image": "@string@.isUrl()",
        "cta_link": "@string@",
        "cta_type": "@string@",
        "body": {
            "description": "@string@.optional()",
            "conditions": "@string@.optional()",
            "rules": "@string@.optional()"
        },
        "origin": "@string@"
    }
    """
    And the JSON node "hydra:view" should exist

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



