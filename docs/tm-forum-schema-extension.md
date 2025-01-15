# Schema Extension of Entities in TMForum

- TMForum Implementation: [FIWARE/tmforum-api](https://github.com/FIWARE/tmforum-api)

In the TMForum information model exists a property called `@schemaLocation` which can be used to specify an additional schema for an [Entity](https://github.com/tmforum-rand/schemas/blob/candidates/Common/Entity.schema.json).
The value of the `@schemaLocation` property has to be a URL, which will be requested at runtime to fetch the additional schema file.

## Extending ProductOfferingTerm for restricting product offerings

The [ProductOfferingTerm](https://github.com/tmforum-rand/schemas/blob/candidates/Product/ProductOfferingTerm.schema.json) is an original entity in the TMForum information model to add usage terms to a product offering. In DOME this property will be used to attach usage policies to a product offering by extending the already existing entity with custom restriction classes.

The following classes are designed to fulfill the current needs for DOME usage control:

- [OperatorRestriction](../schemas/simplified/OperatorRestriction.schema.json): A term definition that collects all attributes, which specifies restrictions on a product offering for access node operators, e.g. marketplaces. _(The enforcement of this term should ideally be done by the source operator before the offering gets replicated to another operator.)_
- [CustomerRestriction](../schemas/simplified/CustomerRestriction.schema.json): A term definition that collects all attributes, which specifies restrictions on product- and offering details for customer groups. _(The enforcement of this term can only be done by the offering marketplace. It should prevent data about the product to be leaked to non authorized customers.)_
- [ProductRestriction](../schemas/simplified/ProductRestriction.schema.json): A term definition that collects all attributes, which specifies restrictions on a product itself. _(The enforcement of this term can only be done by the offering marketplace. It should prevent customers to contract offerings that cannot be supplied to them. Visibility is not restricted by this per se and enforcement of this term is not critical, because the provider can always deny a product request.)_

> For the schema extension a URL to the schema is necessary.
> The examples will use the github links for this,
> but in production a more robust solution for the delivery of schema files should be used.

Creating a product offering at the TMForum API can look something like this:

```http
POST /tmf-api/productCatalogManagement/v4/productOffering
Content-Type: application/json

{
  "id": "urn:ngsi-ld:product-offering:12345678-1234-5678-9abc-123456789abc",
  "description": "Product offering with restriction on operators legal region to Germany, Italy and France.",
  "productOfferingTerm": [
    {
      "@type": "OperatorRestriction",
      "@schemaLocation": "https://raw.githubusercontent.com/DOME-Marketplace/dome-odrl-profile/refs/heads/main/schemas/simplified/OperatorRestriction.schema.json",
      "permittedLegalRegion": [
        {
          "country": "DEU"
        },
        {
          "country": "ITA"
        },
        {
          "country": "FRA"
        }
      ]
    }
  ]
}
```

The `@schemaLocation` is extending the ProductOfferingTerm in this case,
because a general definition of the `productOfferingTerm` does already exist in the current API implementation.

## Extending ProductOffering with related party reference

Adding a related party property to a product offering currently requires to add a custom schema.
There is already a schema in the repository of the API implementation, which will be used for this example,
but in the future this additional schema should be supplied by DOME,
because a change or addition to this schema cannot be done otherwise, like e.g. narrowing the `productOfferingTerm` to specific semantics.

Creating a product offering at the TMForum API can look something like this:

```http
POST /tmf-api/productCatalogManagement/v4/productOffering
Content-Type: application/json

{
  "id": "urn:ngsi-ld:product-offering:12345678-1234-5678-9abc-123456789abc",
  "description": "Product offering with a related party.",
  "relatedParty": [
    {
      "id": "urn:ngsi-ld:organization:owner",
      "role": "Owner"
    }
  ],
  "@schemaLocation": "https://raw.githubusercontent.com/FIWARE/tmforum-api/refs/heads/main/extension-schemas/related-party-extension.json"
}
```

As you can see, the `@schemaLocation` is extending the ProductOffering in this case,
because a definition of the `relatedParty` does not yet exist in the current API implementation.