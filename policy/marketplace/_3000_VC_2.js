let that = {
    "@context": [
        "https://www.w3.org/ns/credentials/v2",
        "https://www.evidenceledger.eu/2022/credentials/employee/v1"
    ],
    "id"      : "b6d16e93-d8fc-4fc3-8969-9ed49af1665a",
    "type"    : [
        "VerifiableCredential",
        "LEARCredentialEmployee"
    ],
    "issuer"  : {
        "id": "did:elsi:IDCES-12345678H"
    },
    "issuanceDate": "2024-04-01 16:27:11.210626229 +0000 UTC",
    "expirationDate": "2025-04-01 16:27:11.210626229 +0000 UTC",
    "credentialSubject": {
        "mandate": {
            "id"      : "90ea73b6-f5a6-4187-b98e-e74d5caa8129",
            "mandator": {
                "organizationIdentifier": "IDCES-12345678H",
                "commonName"            : "RUIZ MARTINEZ JESUS - 12345678H",
                "emailAddress"          : "jesus@alastria.io",
                "serialNumber"          : "IDCES-12345678H",
                "organization"          : "RUIZ MARTINEZ JESUS - 12345678H",
                "country"               : "ES"
            },
            "mandatee": {
                "id"          : "did:key:z2dmzD81cgPx8Vki7JbuuMmFYrWPgYoytykUZ3eyqht1j9KbpjqdRLFCx4THdHvrXV65N9suj2eLGtGdP8rZqbnRJ5pv2o7bnyUCN9jVZAzZ9njwXSZDZG7bZzV6hpS8tw7UeEfPvhfYaxGsmRnArBPcNzc3sVtx5GtiQnxzYUKDT5DEB6",
                "first_name"  : "Pepa",
                "last_name"   : "Pig",
                "gender"      : "F",
                "email"       : "hesus.ruiz@gmail.com",
                "mobile_phone": "676477104"
            },
            "power"    : [
                {
                    "id": "e04c3ccf-6b60-4958-a065-357dc00eb256",
                    "tmf_type": "Domain",
                    // REM: last year I introduced 'target', seem to be the same...
                    "tmf_domain": [
                        "DOME"
                    ],
                    "tmf_function": "Onboarding",
                    "tmf_action"  : [
                        // TODO: starting with a capital letter?
                        "Execute"
                    ]
                },
                {
                    "id"          : "c7c28ab3-9704-4c2a-a838-9e020efb1000",
                    "tmf_type"    : "Domain",
                    "tmf_domain"  : [
                        "DOME"
                    ],
                    "tmf_function": "ProductOffering",
                    "tmf_action"  : [
                        "Create",
                        "Update"
                    ]
                }
            ],
            "life_span": {
                "start_date_time": "2024-04-01 16:27:11.210626229 +0000 UTC",
                "end_date_time"  : "2025-04-01 16:27:11.210626229 +0000 UTC"
            }
        },
        //////////////////////////////////////////////////////////////////////
        // IMPORTANT: END: Alternative >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        //////////////////////////////////////////////////////////////////////
        // TODO: is this 'id' the identifier of given Marketplace-Participant?
        "id"          : "did:key:z2dmzD81cgPx8Vki7JbuuMmFYrWPgYoytykUZ3eyqht1j9KbpjqdRLFCx4THdHvrXV65N9suj2eLGtGdP8rZqbnRJ5pv2o7bnyUCN9jVZAzZ9njwXSZDZG7bZzV6hpS8tw7UeEfPvhfYaxGsmRnArBPcNzc3sVtx5GtiQnxzYUKDT5DEB6",
        "first_name"  : "Pepa",
        "last_name"   : "Pig",
        "gender"      : "F",
        "email"       : "hesus.ruiz@gmail.com",
        "mobile_phone": "676477104",
        // TODO: in what properties of given mandator we are interested in (like 'country')
        // "actOnBehalf" === "mandator"
        "actOnBehalf" : "IDCES-12345678H",          // REM: the Legal Representative
        "_actOnBehalf": "did:key:EXAMPLE_COMPANY",  // REM: the Legal Entity
        // REM: 'country' :: from 'mandator.country' OR Legal Entity or location of marketplace
        "country": "ES",
        // REM: it collects Domain (target) **and** Power **and** Action
        // "purpose" === "power"
        "purpose": [
            "did:key:EXAMPLE_COMPANY/power/Onboarding#Execute",
            "https://dome-marketplace.eu/purpose/Onboarding#Execute",
            //
            "did:key:EXAMPLE_COMPANY/power/ProductOffering#Create",
            "https://dome-marketplace.eu/purpose/ProductOffering#Create",
            //
            "did:key:EXAMPLE_COMPANY/power/ProductOffering#Update",
            "https://dome-marketplace.eu/purpose/ProductOffering#Update"
        ],
        // REM: VC 2.0 :: > Rename issuanceDate/expirationDate to validFrom/validUntil.
        // "life_span": {
        //     "start_date_time": "2024-04-01 16:27:11.210626229 +0000 UTC",
        //     "end_date_time"  : "2025-04-01 16:27:11.210626229 +0000 UTC"
        // },
        // VC-OLD.issuanceDate
        "cred:validFrom": "2024-04-01 16:27:11.210626229 +0000 UTC", // REM: VC 2.0
        "validFrom"     : "2024-04-01 16:27:11.210626229 +0000 UTC",
        // VC-OLD.expirationDate
        "cred:validUntil": "2025-04-01 16:27:11.210626229 +0000 UTC", // REM: VC 2.0
        "validUntil"     : "2025-04-01 16:27:11.210626229 +0000 UTC"
        //////////////////////////////////////////////////////////////////////
        // IMPORTANT: END: Alternative <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        //////////////////////////////////////////////////////////////////////
    },
    // TODO: JWT-stuff here, maybe I do not understand it correctly, but it is confusing me...
    "iss": "did:elsi:IDCES-12345678H",
    "sub": "did:key:z2dmzD81cgPx8Vki7JbuuMmFYrWPgYoytykUZ3eyqht1j9KbpjqdRLFCx4THdHvrXV65N9suj2eLGtGdP8rZqbnRJ5pv2o7bnyUCN9jVZAzZ9njwXSZDZG7bZzV6hpS8tw7UeEfPvhfYaxGsmRnArBPcNzc3sVtx5GtiQnxzYUKDT5DEB6",
    "aud": [
        "everybody"
    ],
    "exp": 1743524838,
    "nbf": 1711988838,
    "iat": 1711988838,
    "jti": "b6d16e93-d8fc-4fc3-8969-9ed49af1665a"
}
