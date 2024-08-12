# TMForum APIs Model

## Catalogue

```json
{
  "catalogType": "string",
  "description": "string",
  "lastUpdate": "2023-10-30T08:26:20.938Z",
  "lifecycleStatus": "string",
  "name": "string",
  "version": "string",
  "category": [
    {
      "id": "string",
      "href": "string",
      "name": "string",
      "version": "string",
      "@baseType": "string",
      "@schemaLocation": "string",
      "@type": "string",
      "@referredType": "string"
    }
  ],
  "relatedParty": [
    {
      "id": "string",
      "href": "string",
      "name": "string",
      "role": "string",
      "@baseType": "string",
      "@schemaLocation": "string",
      "@type": "string",
      "@referredType": "string"
    }
  ],
  "validFor": {
    "endDateTime": "1985-04-12T23:20:50.52Z",
    "startDateTime": "1985-04-12T23:20:50.52Z"
  },
  "@baseType": "string",
  "@schemaLocation": "string",
  "@type": "string"
}
```

## Individual

```json
{
  "id": "string",
  "href": "string",
  "aristocraticTitle": "string",
  "birthDate": "2023-10-30T08:29:31.874Z",
  "countryOfBirth": "string",
  "deathDate": "2023-10-30T08:29:31.874Z",
  "familyName": "string",
  "familyNamePrefix": "string",
  "formattedName": "string",
  "fullName": "string",
  "gender": "string",
  "generation": "string",
  "givenName": "string",
  "legalName": "string",
  "location": "string",
  "maritalStatus": "string",
  "middleName": "string",
  "nationality": "string",
  "placeOfBirth": "string",
  "preferredGivenName": "string",
  "title": "string",
  "contactMedium": [
    {
      "mediumType": "string",
      "preferred": true,
      "characteristic": {
        "city": "string",
        "contactType": "string",
        "country": "string",
        "emailAddress": "string",
        "faxNumber": "string",
        "phoneNumber": "string",
        "postCode": "string",
        "socialNetworkId": "string",
        "stateOrProvince": "string",
        "street1": "string",
        "street2": "string",
        "@baseType": "string",
        "@schemaLocation": "string",
        "@type": "string"
      },
      "validFor": {
        "endDateTime": "2023-10-30T08:29:31.874Z",
        "startDateTime": "2023-10-30T08:29:31.874Z"
      },
      "@baseType": "string",
      "@schemaLocation": "string",
      "@type": "string"
    }
  ],
  "creditRating": [
    {
      "creditAgencyName": "string",
      "creditAgencyType": "string",
      "ratingReference": "string",
      "ratingScore": 0,
      "validFor": {
        "endDateTime": "2023-10-30T08:29:31.874Z",
        "startDateTime": "2023-10-30T08:29:31.874Z"
      },
      "@baseType": "string",
      "@schemaLocation": "string",
      "@type": "string"
    }
  ],
  "disability": [
    {
      "disabilityCode": "string",
      "disabilityName": "string",
      "validFor": {
        "endDateTime": "2023-10-30T08:29:31.874Z",
        "startDateTime": "2023-10-30T08:29:31.874Z"
      },
      "@baseType": "string",
      "@schemaLocation": "string",
      "@type": "string"
    }
  ],
  "externalReference": [
    {
      "externalReferenceType": "string",
      "name": "string",
      "@baseType": "string",
      "@schemaLocation": "string",
      "@type": "string"
    }
  ],
  "individualIdentification": [
    {
      "identificationId": "string",
      "identificationType": "string",
      "issuingAuthority": "string",
      "issuingDate": "2023-10-30T08:29:31.874Z",
      "attachment": {
        "id": "string",
        "href": "string",
        "attachmentType": "string",
        "content": "string",
        "description": "string",
        "mimeType": "string",
        "name": "string",
        "url": "string",
        "size": {
          "amount": 1,
          "units": "string"
        },
        "validFor": {
          "endDateTime": "2023-10-30T08:29:31.874Z",
          "startDateTime": "2023-10-30T08:29:31.874Z"
        },
        "@baseType": "string",
        "@schemaLocation": "string",
        "@type": "string",
        "@referredType": "string"
      },
      "validFor": {
        "endDateTime": "2023-10-30T08:29:31.874Z",
        "startDateTime": "2023-10-30T08:29:31.874Z"
      },
      "@baseType": "string",
      "@schemaLocation": "string",
      "@type": "string"
    }
  ],
  "languageAbility": [
    {
      "isFavouriteLanguage": true,
      "languageCode": "string",
      "languageName": "string",
      "listeningProficiency": "string",
      "readingProficiency": "string",
      "speakingProficiency": "string",
      "writingProficiency": "string",
      "validFor": {
        "endDateTime": "2023-10-30T08:29:31.874Z",
        "startDateTime": "2023-10-30T08:29:31.874Z"
      },
      "@baseType": "string",
      "@schemaLocation": "string",
      "@type": "string"
    }
  ],
  "otherName": [
    {
      "aristocraticTitle": "string",
      "familyName": "string",
      "familyNamePrefix": "string",
      "formattedName": "string",
      "fullName": "string",
      "generation": "string",
      "givenName": "string",
      "legalName": "string",
      "middleName": "string",
      "preferredGivenName": "string",
      "title": "string",
      "validFor": {
        "endDateTime": "2023-10-30T08:29:31.874Z",
        "startDateTime": "2023-10-30T08:29:31.874Z"
      },
      "@baseType": "string",
      "@schemaLocation": "string",
      "@type": "string"
    }
  ],
  "partyCharacteristic": [
    {
      "name": "string",
      "valueType": "string",
      "value": "string",
      "@baseType": "string",
      "@schemaLocation": "string",
      "@type": "string"
    }
  ],
  "relatedParty": [
    {
      "id": "string",
      "href": "string",
      "name": "string",
      "role": "string",
      "@baseType": "string",
      "@schemaLocation": "string",
      "@type": "string",
      "@referredType": "string"
    }
  ],
  "skill": [
    {
      "comment": "string",
      "evaluatedLevel": "string",
      "skillCode": "string",
      "skillName": "string",
      "validFor": {
        "endDateTime": "2023-10-30T08:29:31.874Z",
        "startDateTime": "2023-10-30T08:29:31.874Z"
      },
      "@baseType": "string",
      "@schemaLocation": "string",
      "@type": "string"
    }
  ],
  "status": "initialized",
  "taxExemptionCertificate": [
    {
      "id": "string",
      "attachment": {
        "id": "string",
        "href": "string",
        "attachmentType": "string",
        "content": "string",
        "description": "string",
        "mimeType": "string",
        "name": "string",
        "url": "string",
        "size": {
          "amount": 1,
          "units": "string"
        },
        "validFor": {
          "endDateTime": "2023-10-30T08:29:31.874Z",
          "startDateTime": "2023-10-30T08:29:31.874Z"
        },
        "@baseType": "string",
        "@schemaLocation": "string",
        "@type": "string",
        "@referredType": "string"
      },
      "taxDefinition": [
        {
          "id": "string",
          "name": "string",
          "taxType": "string",
          "@baseType": "string",
          "@schemaLocation": "string",
          "@type": "string",
          "@referredType": "string"
        }
      ],
      "validFor": {
        "endDateTime": "2023-10-30T08:29:31.874Z",
        "startDateTime": "2023-10-30T08:29:31.874Z"
      },
      "@baseType": "string",
      "@schemaLocation": "string",
      "@type": "string"
    }
  ],
  "@baseType": "string",
  "@schemaLocation": "string",
  "@type": "string"
}
```

## Organization

```json
{
  "isHeadOffice": true,
  "isLegalEntity": true,
  "name": "string",
  "nameType": "string",
  "organizationType": "string",
  "tradingName": "string",
  "contactMedium": [
    {
      "mediumType": "string",
      "preferred": true,
      "characteristic": {
        "city": "string",
        "contactType": "string",
        "country": "string",
        "emailAddress": "string",
        "faxNumber": "string",
        "phoneNumber": "string",
        "postCode": "string",
        "socialNetworkId": "string",
        "stateOrProvince": "string",
        "street1": "string",
        "street2": "string",
        "@baseType": "string",
        "@schemaLocation": "string",
        "@type": "string"
      },
      "validFor": {
        "endDateTime": "2023-10-30T08:30:03.771Z",
        "startDateTime": "2023-10-30T08:30:03.771Z"
      },
      "@baseType": "string",
      "@schemaLocation": "string",
      "@type": "string"
    }
  ],
  "creditRating": [
    {
      "creditAgencyName": "string",
      "creditAgencyType": "string",
      "ratingReference": "string",
      "ratingScore": 0,
      "validFor": {
        "endDateTime": "2023-10-30T08:30:03.771Z",
        "startDateTime": "2023-10-30T08:30:03.771Z"
      },
      "@baseType": "string",
      "@schemaLocation": "string",
      "@type": "string"
    }
  ],
  "existsDuring": {
    "endDateTime": "2023-10-30T08:30:03.771Z",
    "startDateTime": "2023-10-30T08:30:03.771Z"
  },
  "externalReference": [
    {
      "externalReferenceType": "string",
      "name": "string",
      "@baseType": "string",
      "@schemaLocation": "string",
      "@type": "string"
    }
  ],
  "organizationChildRelationship": [
    {
      "relationshipType": "string",
      "organization": {
        "id": "string",
        "href": "string",
        "name": "string",
        "@baseType": "string",
        "@schemaLocation": "string",
        "@type": "string",
        "@referredType": "string"
      },
      "@baseType": "string",
      "@schemaLocation": "string",
      "@type": "string"
    }
  ],
  "organizationIdentification": [
    {
      "identificationId": "string",
      "identificationType": "string",
      "issuingAuthority": "string",
      "issuingDate": "2023-10-30T08:30:03.771Z",
      "attachment": {
        "id": "string",
        "href": "string",
        "attachmentType": "string",
        "content": "string",
        "description": "string",
        "mimeType": "string",
        "name": "string",
        "url": "string",
        "size": {
          "amount": 1,
          "units": "string"
        },
        "validFor": {
          "endDateTime": "2023-10-30T08:30:03.771Z",
          "startDateTime": "2023-10-30T08:30:03.771Z"
        },
        "@baseType": "string",
        "@schemaLocation": "string",
        "@type": "string",
        "@referredType": "string"
      },
      "validFor": {
        "endDateTime": "2023-10-30T08:30:03.771Z",
        "startDateTime": "2023-10-30T08:30:03.771Z"
      },
      "@baseType": "string",
      "@schemaLocation": "string",
      "@type": "string"
    }
  ],
  "organizationParentRelationship": {
    "relationshipType": "string",
    "organization": {
      "id": "string",
      "href": "string",
      "name": "string",
      "@baseType": "string",
      "@schemaLocation": "string",
      "@type": "string",
      "@referredType": "string"
    },
    "@baseType": "string",
    "@schemaLocation": "string",
    "@type": "string"
  },
  "otherName": [
    {
      "name": "string",
      "nameType": "string",
      "tradingName": "string",
      "validFor": {
        "endDateTime": "2023-10-30T08:30:03.771Z",
        "startDateTime": "2023-10-30T08:30:03.771Z"
      },
      "@baseType": "string",
      "@schemaLocation": "string",
      "@type": "string"
    }
  ],
  "partyCharacteristic": [
    {
      "name": "string",
      "valueType": "string",
      "value": "string",
      "@baseType": "string",
      "@schemaLocation": "string",
      "@type": "string"
    }
  ],
  "relatedParty": [
    {
      "id": "string",
      "href": "string",
      "name": "string",
      "role": "string",
      "@baseType": "string",
      "@schemaLocation": "string",
      "@type": "string",
      "@referredType": "string"
    }
  ],
  "status": "initialized",
  "taxExemptionCertificate": [
    {
      "id": "string",
      "attachment": {
        "id": "string",
        "href": "string",
        "attachmentType": "string",
        "content": "string",
        "description": "string",
        "mimeType": "string",
        "name": "string",
        "url": "string",
        "size": {
          "amount": 1,
          "units": "string"
        },
        "validFor": {
          "endDateTime": "2023-10-30T08:30:03.771Z",
          "startDateTime": "2023-10-30T08:30:03.771Z"
        },
        "@baseType": "string",
        "@schemaLocation": "string",
        "@type": "string",
        "@referredType": "string"
      },
      "taxDefinition": [
        {
          "id": "string",
          "name": "string",
          "taxType": "string",
          "@baseType": "string",
          "@schemaLocation": "string",
          "@type": "string",
          "@referredType": "string"
        }
      ],
      "validFor": {
        "endDateTime": "2023-10-30T08:30:03.772Z",
        "startDateTime": "2023-10-30T08:30:03.772Z"
      },
      "@baseType": "string",
      "@schemaLocation": "string",
      "@type": "string"
    }
  ],
  "@baseType": "string",
  "@schemaLocation": "string",
  "@type": "string"
}
```

## Product

```json
{
  "description": "string",
  "isBundle": true,
  "isCustomerVisible": true,
  "name": "string",
  "orderDate": "2023-10-30T08:28:37.638Z",
  "productSerialNumber": "string",
  "startDate": "2023-10-30T08:28:37.638Z",
  "terminationDate": "2023-10-30T08:28:37.638Z",
  "agreement": [
    {
      "id": "string",
      "href": "string",
      "agreementItemId": "string",
      "name": "string",
      "@baseType": "string",
      "@schemaLocation": "string",
      "@type": "string",
      "@referredType": "string"
    }
  ],
  "billingAccount": {
    "id": "string",
    "href": "string",
    "name": "string",
    "@baseType": "string",
    "@schemaLocation": "string",
    "@type": "string",
    "@referredType": "string"
  },
  "place": [
    {
      "id": "string",
      "href": "string",
      "name": "string",
      "role": "string",
      "@baseType": "string",
      "@schemaLocation": "string",
      "@type": "string",
      "@referredType": "string"
    }
  ],
  "product": [
    {
      "id": "string",
      "href": "string",
      "description": "string",
      "isBundle": true,
      "isCustomerVisible": true,
      "name": "string",
      "orderDate": "2023-10-30T08:28:37.638Z",
      "productSerialNumber": "string",
      "startDate": "2023-10-30T08:28:37.638Z",
      "terminationDate": "2023-10-30T08:28:37.638Z",
      "agreement": [
        {
          "id": "string",
          "href": "string",
          "agreementItemId": "string",
          "name": "string",
          "@baseType": "string",
          "@schemaLocation": "string",
          "@type": "string",
          "@referredType": "string"
        }
      ],
      "billingAccount": {
        "id": "string",
        "href": "string",
        "name": "string",
        "@baseType": "string",
        "@schemaLocation": "string",
        "@type": "string",
        "@referredType": "string"
      },
      "place": [
        {
          "id": "string",
          "href": "string",
          "name": "string",
          "role": "string",
          "@baseType": "string",
          "@schemaLocation": "string",
          "@type": "string",
          "@referredType": "string"
        }
      ],
      "product": [
        "string"
      ],
      "productCharacteristic": [
        {
          "name": "string",
          "valueType": "string",
          "value": "string",
          "@baseType": "string",
          "@schemaLocation": "string",
          "@type": "string"
        }
      ],
      "productOffering": {
        "id": "string",
        "href": "string",
        "name": "string",
        "@baseType": "string",
        "@schemaLocation": "string",
        "@type": "string",
        "@referredType": "string"
      },
      "productOrderItem": [
        {
          "orderItemAction": "string",
          "orderItemId": "string",
          "productOrderHref": "string",
          "productOrderId": "string",
          "role": "string",
          "@baseType": "string",
          "@schemaLocation": "string",
          "@type": "string",
          "@referredType": "string"
        }
      ],
      "productPrice": [
        {
          "description": "string",
          "name": "string",
          "priceType": "string",
          "recurringChargePeriod": "string",
          "unitOfMeasure": "string",
          "billingAccount": {
            "id": "string",
            "href": "string",
            "name": "string",
            "@baseType": "string",
            "@schemaLocation": "string",
            "@type": "string",
            "@referredType": "string"
          },
          "price": {
            "percentage": 0,
            "taxRate": 0,
            "dutyFreeAmount": {
              "unit": "string",
              "value": 0
            },
            "taxIncludedAmount": {
              "unit": "string",
              "value": 0
            },
            "@baseType": "string",
            "@schemaLocation": "string",
            "@type": "string"
          },
          "productOfferingPrice": {
            "id": "string",
            "href": "string",
            "name": "string",
            "@baseType": "string",
            "@schemaLocation": "string",
            "@type": "string",
            "@referredType": "string"
          },
          "productPriceAlteration": [
            {
              "applicationDuration": 0,
              "description": "string",
              "name": "string",
              "priceType": "string",
              "priority": 0,
              "recurringChargePeriod": "string",
              "unitOfMeasure": "string",
              "price": {
                "percentage": 0,
                "taxRate": 0,
                "dutyFreeAmount": {
                  "unit": "string",
                  "value": 0
                },
                "taxIncludedAmount": {
                  "unit": "string",
                  "value": 0
                },
                "@baseType": "string",
                "@schemaLocation": "string",
                "@type": "string"
              },
              "productOfferingPrice": {
                "id": "string",
                "href": "string",
                "name": "string",
                "@baseType": "string",
                "@schemaLocation": "string",
                "@type": "string",
                "@referredType": "string"
              },
              "@baseType": "string",
              "@schemaLocation": "string",
              "@type": "string"
            }
          ],
          "@baseType": "string",
          "@schemaLocation": "string",
          "@type": "string"
        }
      ],
      "productRelationship": [
        {
          "relationshipType": "string",
          "product": "string",
          "@baseType": "string",
          "@schemaLocation": "string",
          "@type": "string"
        }
      ],
      "productSpecification": {
        "id": "string",
        "href": "string",
        "name": "string",
        "version": "string",
        "targetProductSchema": {
          "@baseType": "string",
          "@schemaLocation": "string",
          "@type": "string"
        },
        "@baseType": "string",
        "@schemaLocation": "string",
        "@type": "string",
        "@referredType": "string"
      },
      "productTerm": [
        {
          "description": "string",
          "name": "string",
          "duration": {
            "amount": 1,
            "units": "string"
          },
          "validFor": {
            "endDateTime": "2023-10-30T08:28:37.638Z",
            "startDateTime": "2023-10-30T08:28:37.638Z"
          },
          "@baseType": "string",
          "@schemaLocation": "string",
          "@type": "string"
        }
      ],
      "realizingResource": [
        {
          "id": "string",
          "href": "string",
          "name": "string",
          "value": "string",
          "@baseType": "string",
          "@schemaLocation": "string",
          "@type": "string",
          "@referredType": "string"
        }
      ],
      "realizingService": [
        {
          "id": "string",
          "href": "string",
          "name": "string",
          "@baseType": "string",
          "@schemaLocation": "string",
          "@type": "string",
          "@referredType": "string"
        }
      ],
      "relatedParty": [
        {
          "id": "string",
          "href": "string",
          "name": "string",
          "role": "string",
          "@baseType": "string",
          "@schemaLocation": "string",
          "@type": "string",
          "@referredType": "string"
        }
      ],
      "status": "created",
      "@baseType": "string",
      "@schemaLocation": "string",
      "@type": "string",
      "@referredType": "string"
    }
  ],
  "productCharacteristic": [
    {
      "name": "string",
      "valueType": "string",
      "value": "string",
      "@baseType": "string",
      "@schemaLocation": "string",
      "@type": "string"
    }
  ],
  "productOffering": {
    "id": "string",
    "href": "string",
    "name": "string",
    "@baseType": "string",
    "@schemaLocation": "string",
    "@type": "string",
    "@referredType": "string"
  },
  "productOrderItem": [
    {
      "orderItemAction": "string",
      "orderItemId": "string",
      "productOrderHref": "string",
      "productOrderId": "string",
      "role": "string",
      "@baseType": "string",
      "@schemaLocation": "string",
      "@type": "string",
      "@referredType": "string"
    }
  ],
  "productPrice": [
    {
      "description": "string",
      "name": "string",
      "priceType": "string",
      "recurringChargePeriod": "string",
      "unitOfMeasure": "string",
      "billingAccount": {
        "id": "string",
        "href": "string",
        "name": "string",
        "@baseType": "string",
        "@schemaLocation": "string",
        "@type": "string",
        "@referredType": "string"
      },
      "price": {
        "percentage": 0,
        "taxRate": 0,
        "dutyFreeAmount": {
          "unit": "string",
          "value": 0
        },
        "taxIncludedAmount": {
          "unit": "string",
          "value": 0
        },
        "@baseType": "string",
        "@schemaLocation": "string",
        "@type": "string"
      },
      "productOfferingPrice": {
        "id": "string",
        "href": "string",
        "name": "string",
        "@baseType": "string",
        "@schemaLocation": "string",
        "@type": "string",
        "@referredType": "string"
      },
      "productPriceAlteration": [
        {
          "applicationDuration": 0,
          "description": "string",
          "name": "string",
          "priceType": "string",
          "priority": 0,
          "recurringChargePeriod": "string",
          "unitOfMeasure": "string",
          "price": {
            "percentage": 0,
            "taxRate": 0,
            "dutyFreeAmount": {
              "unit": "string",
              "value": 0
            },
            "taxIncludedAmount": {
              "unit": "string",
              "value": 0
            },
            "@baseType": "string",
            "@schemaLocation": "string",
            "@type": "string"
          },
          "productOfferingPrice": {
            "id": "string",
            "href": "string",
            "name": "string",
            "@baseType": "string",
            "@schemaLocation": "string",
            "@type": "string",
            "@referredType": "string"
          },
          "@baseType": "string",
          "@schemaLocation": "string",
          "@type": "string"
        }
      ],
      "@baseType": "string",
      "@schemaLocation": "string",
      "@type": "string"
    }
  ],
  "productRelationship": [
    {
      "relationshipType": "string",
      "product": "string",
      "@baseType": "string",
      "@schemaLocation": "string",
      "@type": "string"
    }
  ],
  "productSpecification": {
    "id": "string",
    "href": "string",
    "name": "string",
    "version": "string",
    "targetProductSchema": {
      "@baseType": "string",
      "@schemaLocation": "string",
      "@type": "string"
    },
    "@baseType": "string",
    "@schemaLocation": "string",
    "@type": "string",
    "@referredType": "string"
  },
  "productTerm": [
    {
      "description": "string",
      "name": "string",
      "duration": {
        "amount": 1,
        "units": "string"
      },
      "validFor": {
        "endDateTime": "2023-10-30T08:28:37.639Z",
        "startDateTime": "2023-10-30T08:28:37.639Z"
      },
      "@baseType": "string",
      "@schemaLocation": "string",
      "@type": "string"
    }
  ],
  "realizingResource": [
    {
      "id": "string",
      "href": "string",
      "name": "string",
      "value": "string",
      "@baseType": "string",
      "@schemaLocation": "string",
      "@type": "string",
      "@referredType": "string"
    }
  ],
  "realizingService": [
    {
      "id": "string",
      "href": "string",
      "name": "string",
      "@baseType": "string",
      "@schemaLocation": "string",
      "@type": "string",
      "@referredType": "string"
    }
  ],
  "relatedParty": [
    {
      "id": "string",
      "href": "string",
      "name": "string",
      "role": "string",
      "@baseType": "string",
      "@schemaLocation": "string",
      "@type": "string",
      "@referredType": "string"
    }
  ],
  "status": "created",
  "@baseType": "string",
  "@schemaLocation": "string",
  "@type": "string"
}
```