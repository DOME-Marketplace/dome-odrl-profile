# Usage of json-schemas in TMForum

In order to extend entities in TMForum, the [```@schemaLocation```](https://github.com/tmforum-rand/schemas/blob/candidates/Common/Entity.schema.json#L12-L19) property can be used. It allows to provide the URI of a JSON-Schema file that defines additional attributes and relationships.

In DOME this will be use for:

* extending the [ProductOfferingTerm](https://github.com/tmforum-rand/schemas/blob/candidates/Product/ProductOfferingTerm.schema.json) to replication-restrictions. The schema is located at [MarketplaceReplicationRestriction](../schemas/simplified/MarketplaceReplicationRestriction.schema.json)

```shell
    curl -X POST  http://<TMFORUM_API>/tmf-api/productCatalogManagement/v4/productOffering
        -H 'Content-Type: application/json' \
        -d  '{
                "description": "Product Offering with a restriction.",
                "productOfferingTerm": [
                    { 
                        "@type": "MarketplaceRestriction",
                        "permittedMarketplace": [
                        {
                            "id": "did:web:mymarketplace.org"
                        }
                        ],
                        "prohibitedMarketplace": [
                        {
                            "id": "did:web:the-competitor.org"
                        }
                        ],
                        "permittedLegalRegion": ["DE", "AU"],
                        "prohibitedLegalRegion": ["FR"],
                        "@schemaLocation": "https://raw.githubusercontent.com/DOME-Marketplace/dome-odrl-profile/refs/heads/replication-restriction/schemas/simplified/MarketplaceReplicationRestriction.schema.json"
                    }
                ]
            }'
```

* extend the [ProductOffering](https://tmforum-rand.github.io/schemas/Product/ProductOffering.schema.json) with support for [RelatedPartyReferences](https://tmforum-rand.github.io/schemas/EngagedParty/RelatedPartyRef.schema.json)

```shell
    curl -X POST  http://<TMFORUM_API>/tmf-api/productCatalogManagement/v4/productOffering
        -H 'Content-Type: application/json' \
        -d  '{
                "description": "Product Offering with a related party.",
                "relatedParty": [
                    {
                        "id": "urn:ngsi-ld:organization:owner",
                        "role": "Owner"
                    }
                ],
                "@schemaLocation": "https://raw.githubusercontent.com/FIWARE/tmforum-api/refs/heads/main/extension-schemas/related-party-extension.json"
            }'
```