let that = {
    "@context": [
        // TODO: @jesus: both URLs start with a blank (in the original)
        "https://www.w3.org/ns/credentials/v2",
        // TODO: when will this context be defined?
        "https://www.evidenceledger.eu/2022/credentials/employee/v1"
    ],
    "id"      : "b6d16e93-d8fc-4fc3-8969-9ed49af1665a",
    "type"    : [
        "VerifiableCredential",
        "LEARCredentialEmployee"
    ],
    "issuer"  : {
        // TODO: is this 'id' the identifier of given
        //          - Legal Representative?
        //          - Federated-Marketplace-Participant (Legal Entity)?
        "id": "did:elsi:IDCES-12345678H"
    },
    // TODO: VC 2.0 (see @context) :: > rename 'issuanceDate'/'expirationDate' to 'validFrom'/'validUntil'.
    "issuanceDate": "2024-04-01 16:27:11.210626229 +0000 UTC",
    // ... "validFrom"     : "2024-04-01 16:27:11.210626229 +0000 UTC",
    "expirationDate": "2025-04-01 16:27:11.210626229 +0000 UTC",
    // ... "validUntil"   : "2025-04-01 16:27:11.210626229 +0000 UTC",
    "credentialSubject": {
        // IMPORTANT: (for all properties) we should keep in mid: if we put all to *base*
        // IMPORTANT:     maybe we will have to face the fact, that if VC took this property, too,
        // IMPORTANT:     we produce some sort of "collision"...
        // TODO: we can drop "mandate"?!?
        "mandate": {
            // TODO: is this identifier used anyhow, in any place?
            "id"      : "90ea73b6-f5a6-4187-b98e-e74d5caa8129",
            "mandator": {
                // REM: the Legal Representative
                "commonName"  : "RUIZ MARTINEZ JESUS - 12345678H",
                "emailAddress": "jesus@alastria.io",
                "serialNumber": "IDCES-12345678H",
                // TODO: 'organizationIdentifier' :: this the identifier of the
                // TODO:    organization given 'mandator' (the Representative) is acting on behalf?
                // TODO:    "IDCES-12345678H" are used in 'organizationIdentifier' **AND** 'serialNumber'
                // TODO:    ...this is confusing me.
                "organizationIdentifier": "IDCES-12345678H",
                "organization"          : "RUIZ MARTINEZ JESUS - 12345678H",
                "country"               : "ES"
            },
            "mandatee": {
                // REM: the Legal Entity Appointed Representative, Natural Person
                "id"          : "did:key:z2dmzD81cgPx8Vki7JbuuMmFYrWPgYoytykUZ3eyqht1j9KbpjqdRLFCx4THdHvrXV65N9suj2eLGtGdP8rZqbnRJ5pv2o7bnyUCN9jVZAzZ9njwXSZDZG7bZzV6hpS8tw7UeEfPvhfYaxGsmRnArBPcNzc3sVtx5GtiQnxzYUKDT5DEB6",
                "first_name"  : "Pepa",
                "last_name"   : "Pig",
                "gender"      : "F",
                "email"       : "hesus.ruiz@gmail.com",
                "mobile_phone": "676477104"
            },
            // TODO: 'power' :: this is replacing "rolesAndDuties" (as shown in the DOME-Specs)?
            "power"    : [
                {
                    "id": "e04c3ccf-6b60-4958-a065-357dc00eb256",
                    // TODO: for all 'tmf_' :: do need to put this in?!? Here it seems something like
                    // TODO:    a prefix. I'm fine with, it's a first step to linked-data...
                    // TODO:    ...and if we do it this way: might it be better to use 'dome_' instead if 'tmf_'?
                    "tmf_type": "Domain",
                    // REM: last year I introduced 'target', seem to be the same...
                    "tmf_domain": [
                        // TODO: 'tmf_domain' :: how are those "registered"?
                        // TODO: could it be a did, too?
                        "DOME"
                    ],
                    // TODO: 'tmf_function' :: how are those "registered"?
                    "tmf_function": "Onboarding",
                    "tmf_action"  : [
                        // TODO: 'tmf_action' :: how are those "registered"?
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
            },
            // TODO: why not using this:
            //// "cred:validFrom": "2024-04-01 16:27:11.210626229 +0000 UTC", // REM: VC 2.0
            //   "validFrom"     : "2024-04-01 16:27:11.210626229 +0000 UTC",
            //// "cred:validUntil": "2025-04-01 16:27:11.210626229 +0000 UTC", // REM: VC 2.0
            //   "validUntil"     : "2025-04-01 16:27:11.210626229 +0000 UTC"
        }
    },
    "iss"              : "did:elsi:IDCES-12345678H",
    "sub"              : "did:key:z2dmzD81cgPx8Vki7JbuuMmFYrWPgYoytykUZ3eyqht1j9KbpjqdRLFCx4THdHvrXV65N9suj2eLGtGdP8rZqbnRJ5pv2o7bnyUCN9jVZAzZ9njwXSZDZG7bZzV6hpS8tw7UeEfPvhfYaxGsmRnArBPcNzc3sVtx5GtiQnxzYUKDT5DEB6",
    "aud"              : [
        "everybody"
    ],
    "exp"              : 1743524838,
    "nbf"              : 1711988838,
    "iat"              : 1711988838,
    "jti"              : "b6d16e93-d8fc-4fc3-8969-9ed49af1665a"
}
