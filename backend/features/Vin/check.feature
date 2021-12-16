@mysuzuki.vin
Feature: Check VIN validity
  In order to manage users
  As a client software developer
  I need to be able to retrieve them through the API.

  Background:
    Given I load the fixtures
    And I add "Accept" header equal to "application/ld+json"

  Scenario: I send a valid VIN/name couple
    When I add "Authorization" header equal to "Bearer app-access-token"
    And I send a "GET" request to "/api/vins/19UUB2F73FA074352" with parameters:
      | key       | value   |
      | last_name | RICHARD |
    Then the response status code should be 200
    And the response should be in JSON
    And the JSON should be equal to:
    """
    {
      "@context": "/api/contexts/Vin",
      "@id": "/api/vins/19UUB2F73FA074352",
      "@type": "Vin",
      "id": "19UUB2F73FA074352",
      "last_name": "RICHARD",
      "client_id": 1
    }
    """

  Scenario: I send a valid VIN/name couple but the name contains accented characters
    When I add "Authorization" header equal to "Bearer app-access-token"
    And I send a "GET" request to "/api/vins/19UUB2F73FA074352" with parameters:
      | key       | value   |
      | last_name | RICHàRD |
    Then the response status code should be 200
    And the response should be in JSON
    And the JSON should be equal to:
    """
    {
      "@context": "/api/contexts/Vin",
      "@id": "/api/vins/19UUB2F73FA074352",
      "@type": "Vin",
      "id": "19UUB2F73FA074352",
      "last_name": "RICHARD",
      "client_id": 1
    }
    """
