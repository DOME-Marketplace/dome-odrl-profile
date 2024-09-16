# Catalogue visibility control

## Use cases

**Refernce:** [Catalogue visibility control - use cases](https://docs.google.com/document/d/1z5v3qLh_CMqzTedNcaIobvn-qvDzAaDcpMHlgEBr7CY)

### Restrict offerings for specific marketplaces

> **Use case:** I don’t want my product to be published on Aruba marketplaces due to competition.  
> **Partner:** DHUB (Beppe Cafiso)

```json
// Simplified Term
{
  "prohibitedMarketplace": [
    { "id": "urn:ngsi-ld:marketplace:uuid-of-aruba-marketplace" }
  ]
}
```

```json
// ODRL Policy
{
  "prohibition": [
    {
      "action": "use",
      "target": { "uid": "urn:ngsi-ld:product-offering:uuid-of-this-offering" },
      "assignee": { "uid": "urn:ngsi-ld:marketplace:uuid-of-aruba-marketplace" },
      "assigner": { "uid": "urn:ngsi-ld:marketplace:uuid-of-dhub-marketplace" }
    }
  ]
}
```

> **Use case:** I don’t want to replicate my products to marketplaces in Russia due embargo restrictions.  
> **Partner:** DHUB (Beppe Cafiso)

```json
// Simplified Term
{
  "prohibitedLegalRegion": [
    { "id": "urn:ngsi-ld:country:russia" }
  ]
}
```

```json
// ODRL Policy
{
  "prohibition": [
    {
      "action": "use",
      "target": { "uid": "urn:ngsi-ld:product-offering:uuid-of-this-offering" },
      "assignee": { 
        "source": "urn:ngsi-ld:marketplace-group:federated-marketplaces",
        "refinement": [
          {
            "leftOperand": "legalEntity",
            "operator": "locatedIn",
            "rightOperand": { "uid": "urn:ngsi-ld:country:russia" }
          }
        ]
      }
    }
  ]
}
```

> **Use case:** I don’t want my product to be published on competitors' marketplaces.  
> **Partner:** CSI (Davide De Santis)

```json
// Simplified Term
{
  "prohibitedMarketplace": [
    { "id": "urn:ngsi-ld:marketplace:uuid-of-competitors-marketplace" }
  ]
}
```

```json
// ODRL Policy
{
  "prohibition": [
    {
      "action": "use",
      "target": { "uid": "urn:ngsi-ld:product-offering:uuid-of-this-offering" },
      "assignee": { "uid": "urn:ngsi-ld:marketplace:uuid-of-competitors-marketplace" },
      "assigner": { "uid": "urn:ngsi-ld:marketplace:uuid-of-csi-marketplace" }
    }
  ]
}
```

### Restrict offerings for specific customers

> **Use case:** I want my offering Meat Price Tracker to be visible only to Spanish customers on any marketplace.  
> **Reason:** Data is received from the Spanish market only.  
> **Partner:** DA (Claudia Silvestre)

```json
// Simplified Term
{
  "permittedCustomerRegion": [
    { "id": "urn:ngsi-ld:country:spain" }
  ]
}
```

```json
// ODRL Policy
{
  "permission": [
    {
      "action": "accept",
      "target": { "uid": "urn:ngsi-ld:product-offering:uuid-of-this-offering" },
      "assignee": { 
        "source": "urn:ngsi-ld:customer-group:all-customers",
        "refinement": [
          {
            "leftOperand": "customerResidence",
            "operator": "locatedIn",
            "rightOperand": { "uid": "urn:ngsi-ld:country:spain" }
          }
        ]
       },
      "assigner": { "uid": "urn:ngsi-ld:marketplace:uuid-of-da-marketplace" }
    }
  ]
}
```

> **Use case:** My offering must be visible ONLY on EU countries.  
> **Partner:** CSI (Davide De Santis)

```json
// Simplified Term
{
  "permittedCustomerRegion": [
    { "id": "urn.ngsi-ld:country:AT" },
    { "id": "urn.ngsi-ld:country:BE" },
    { "id": "urn.ngsi-ld:country:BG" },
    { "id": "urn.ngsi-ld:country:HR" },
    { "id": "urn.ngsi-ld:country:CY" },
    { "id": "urn.ngsi-ld:country:CZ" },
    { "id": "urn.ngsi-ld:country:DK" },
    { "id": "urn.ngsi-ld:country:EE" },
    { "id": "urn.ngsi-ld:country:FI" },
    { "id": "urn.ngsi-ld:country:FR" },
    { "id": "urn.ngsi-ld:country:DE" },
    { "id": "urn.ngsi-ld:country:GR" },
    { "id": "urn.ngsi-ld:country:HU" },
    { "id": "urn.ngsi-ld:country:IE" },
    { "id": "urn.ngsi-ld:country:IT" },
    { "id": "urn.ngsi-ld:country:LV" },
    { "id": "urn.ngsi-ld:country:LT" },
    { "id": "urn.ngsi-ld:country:LU" },
    { "id": "urn.ngsi-ld:country:MT" },
    { "id": "urn.ngsi-ld:country:NL" },
    { "id": "urn.ngsi-ld:country:PL" },
    { "id": "urn.ngsi-ld:country:PT" },
    { "id": "urn.ngsi-ld:country:RO" },
    { "id": "urn.ngsi-ld:country:SK" },
    { "id": "urn.ngsi-ld:country:SI" },
    { "id": "urn.ngsi-ld:country:ES" },
    { "id": "urn.ngsi-ld:country:SE" },
  ]
}
```

```json
// ODRL Policy
{
  "permission": [
    {
      "action": "accept",
      "target": { "uid": "urn:ngsi-ld:product-offering:uuid-of-this-offering" },
      "assignee": { 
        "source": "urn:ngsi-ld:customer-group:all-customers",
        "refinement": [
          {
            "leftOperand": "customerResidence",
            "operator": "locatedIn",
            // can be resolved into geospacial area
            "rightOperand": { "uid": "urn:ngsi-ld:country-group:europe" } 
          }
        ]
       },
      "assigner": { "uid": "urn:ngsi-ld:marketplace:uuid-of-csi-marketplace" }
    }
  ]
}
```

> **Use case:** For some product I don’t want to make available some option (ex. On prem devices installation) on federated marketplaces outside the 3000km from Italy to reduce travel cost for logistic problems.  
> **Partner:** DHUB (Beppe Cafiso)

```json
// Simplified Term
{
  "permittedCustomerRegion": [
    { 
      // geospatial area 3000km of italy as TMForum GeographicAddress
    }
  ]
}
```

```json
// ODRL Policy
{
  "permission": [
    {
      "action": "accept",
      "target": { "uid": "urn:ngsi-ld:product-offering:uuid-of-the-specific-offering-option" },
      "assignee": { 
        "source": "urn:ngsi-ld:customer-group:all-customers",
        "refinement": [
          {
            "leftOperand": "customerResidence",
            "operator": "locatedIn",
            "rightOperand": { 
              // geospatial area 3000km of italy as GeoJSON-format
            }
          }
        ]
       },
      "assigner": { "uid": "urn:ngsi-ld:marketplace:uuid-of-dhub-marketplace" }
    }
  ]
}
```

### Restrict pricing visibility

> **Use case:** For some products I don’t want to publicly expose prices but I want the capability to have a private dealing.  
> **Partner:** DHUB (Beppe Cafiso)

```json
// Simplified Term
{
  "hiddenProperty": [
    "productOfferingPrice"
  ]
}
```

> **Use case:** For Smart City Monitor service we don’t want to expose prices publicly but want the capability to have a private dealing.  
> **Reason:** The prices need to be adjusted according to a given municipality size and national average income.  
> **Partner:** GOLEM (Serguei Golovanov)

```json
// Simplified Term
{
  "hiddenProperty": [
    "productOfferingPrice"
  ]
}
```

> **Use case:** For our industrial Services with a holistic approach we need a private dealing based on the considered impact by the service. Therefore we don’t want to expose prices publicly.  
> **Partner:** IF Digital (Joachim Starke)

```json
// Simplified Term
{
  "hiddenProperty": [
    "productOfferingPrice"
  ]
}
```

### Other restrictions

> **Use case:** I want to underline that my offer is dedicated (80%) to Public Administration and Entities, Government Agencies, NPO in the public administration field. The PA contract generally follows a tailored method.  
> **Partner:** CSI (Davide De Santis)

## Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "definitions": {
    "MarketplaceRestriction": {
      "title": "MarketplaceRestriction",
      "description": "",
      "type": "object",
      "properties": {
        "prohibitedMarketplace": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/MarketplaceRef"
          }
        },
        "prohibitedLegalRegion": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/GeographicAddressRefOrValue"
          }
        }
      },
      "allOf": [
        {
          "$ref": "#/definitions/ProductOfferingTerm"
        }
      ]
    },
    "CustomerRestriction": {
      "title": "CustomerRestriction",
      "description": "",
      "type": "object",
      "properties": {
        "permittedCustomerRegion": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/GeographicAddressRefOrValue"
          }
        }
      },
      "allOf": [
        {
          "$ref": "#/definitions/ProductOfferingTerm"
        }
      ]
    },
    "GeographicAddressRefOrValue": {
      "title": "GeographicAddressRefOrValue",
      "description": "",
      "type": "object",
      "oneOf": [
        {
          "$ref": "#/definitions/GeographicAddressRef"
        },
        {
          "$ref": "#/definitions/GeographicAddress"
        }
      ]
    },
    "MarketplaceRef": {
      "title": "MarketplaceRef",
      "description": "",
      "type": "object",
      "oneOf": [
        {
          "$ref": "#/definitions/EntityRef"
        }
      ]
    }
  }
}
```