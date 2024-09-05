# Policy Use Cases

This is a collection of use cases and requirements that should be covered by policy or term expressions. Please feel free to create issues to discuss and add new requirements to the list. Keep in mind that this should generally align to the already existing `ProductOfferingTerm` of the TMForum API, regardless of the policy expression language. This also means that policies or terms are focused on the product offerings. If there is need to add policies elsewhere, the integration of those could also be discussed.

## Geographic Restriction

It should be possible to restrict an offering to a specific geographic region. This region could for example be one or multiple countries, but it could also be a collection of cities or possibly any arbitrary regional polygon. The expression of this geographic restriction should therefore be able to contain well-known regional identifiers, partially geographic address filters or absolute geographic polygons in GeoJSON format. It should also be possible to add multiple regions and to combine them with further restrictions based on the associated region.

### An offering should only address federated marketplaces in Germany.

```json
{
  "@baseType": "ProductOfferingTerm",
  "@type": "GeographicRestriction",
  "marketplaceLocation": {
    "@type": "GeographicAddress",
    "country": "DE"
  }
}
```

## Temporal Restriction

The `ProductOfferingTerm` is already defined to include a temporal validity of terms. This should not only be usable to define the validity of a term, but also to define the allowed time period for a product offering. This could be done either with a No-Usage term that is valid outside the permitted period of the offering, or with a Usage term that is restricted to the specified time period. In the latter case, the marketplace must conform to the rule that in invalid Usage term restricts access to the offering. Because Usage or No-Usage terms are a silly concept, it would be easier to add a different attribute than `duration` or `validFor` to define a temporal restriction.

### An offering should only be available in the year 2024

```json
{
  "@baseType": "ProductOfferingTerm",
  "@type": "TemporalRestriction",
  "availabilityPeriod": {
    "@type": "TimePeriod",
    "startDateTime": "2024-01-01T00:00:00Z",
    "endDateTime": "2024-12-31T23:59:59Z"
  }
}
```

## Marketplace Restriction

```json
{
  "@baseType": "ProductOfferingTerm",
  "@type": "MarketplaceRestriction",
  "targetMarketplace": [{
    "@type": "PlaceRef",
    "id": "urn:ngsi-ld:place:...",
    "href": "https://yumket.eu/"
  }],
  "excludedMarketplace": [{
    "@type": "PlaceRef",
    "id": "urn:ngsi-ld:place:..."
  }]
}
```

## Other

```json
{
  "@baseType": "ProductOfferingTerm",
  "@type": "CustomerRestriction",
  "authenticatedOnly": true
}
```