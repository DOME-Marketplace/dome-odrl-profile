import { issue, derive, defaultDocumentLoader } from '@digitalbazaar/vc'

import * as EcdsaMultikey from '@digitalbazaar/ecdsa-multikey'
import { createDiscloseCryptosuite, createSignCryptosuite, createVerifyCryptosuite } from '@digitalbazaar/ecdsa-sd-2023-cryptosuite'
import { DataIntegrityProof } from '@digitalbazaar/data-integrity'
import { v4 as uuid } from 'uuid'

import { join } from 'node:path'
import { readFile, writeFile } from 'node:fs/promises'

type ContextDocument = { '@context': Record<string, any> }

const { constants: { SECURITY_CONTEXT_V1_URL, SECURITY_CONTEXT_V2_URL }, contexts: securityContext } = await import('@digitalbazaar/security-context')
const contexts: Record<string, ContextDocument> = Object.create(null)
contexts[SECURITY_CONTEXT_V1_URL] = securityContext.get(SECURITY_CONTEXT_V1_URL)
contexts[SECURITY_CONTEXT_V2_URL] = securityContext.get(SECURITY_CONTEXT_V2_URL)
const DOME_CONTEXT_V1_URL = 'https://dome-marketplace.eu/credentials/v1'
contexts[DOME_CONTEXT_V1_URL] = (await import('../model/credentials.json')).default

async function documentLoader(url: string): Promise<{ documentUrl: string, document: ContextDocument }> {
  if (!contexts[url]) {
    try {
      const response = await fetch(url)
      const document = await response.json() as ContextDocument
      if (!document['@context']) throw new Error('invalid ContextDocument')
      contexts[url] = document
    } catch (err) {
      console.error(err)
      return defaultDocumentLoader(url)
    }
  }
  return { documentUrl: url, document: contexts[url] }
}

const ecdsaKeyPair = await EcdsaMultikey.generate({
  curve: 'P-256',
  id: 'https://example.edu/issuers/keys/2',
  controller: 'https://example.edu/issuers/565049'
});

const suite = new DataIntegrityProof({
  signer: ecdsaKeyPair.signer(),
  date: new Date(),
  cryptosuite: createSignCryptosuite({
    // require the `issuer` and `issuanceDate` fields to always be disclosed
    // by the holder (presenter)
    mandatoryPointers: [
      '/issuanceDate',
      '/issuer'
    ]
  })
})

// use a proof ID to enable it to be found and transformed into a disclosure
// proof by the holder later
const proofId = `urn:uuid:${uuid()}`;
//@ts-ignore
suite.proof = { id: proofId };

const EXAMPLES_FOLDER = join(import.meta.dirname, '../examples')
const OFFERING_INPUT_FILE = join(EXAMPLES_FOLDER, 'product-offering-process-data-analyzer.json')
const VC_OUTPUT_FILE = join(EXAMPLES_FOLDER, 'product-offering-process-data-analyzer.vc.json')

const offering = JSON.parse(
  await readFile(OFFERING_INPUT_FILE, 'utf-8'),
  (key, value) => key.startsWith('@') ? undefined : value
)

const credential = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    // "https://www.w3.org/ns/credentials/v2",
    DOME_CONTEXT_V1_URL
  ],
  "id": "https://example.com/credentials/" + offering.id,
  "type": ["VerifiableCredential", "SignedOffering"],
  "issuer": offering.productSpecification.relatedParty[0].href,
  "issuanceDate": new Date().toISOString(),
  "credentialSubject": offering
}

const signedOffering = await issue({ credential, suite, documentLoader })
// console.log(JSON.stringify(signedOffering, null, 2))
// await writeFile(VC_OUTPUT_FILE, JSON.stringify(signedOffering, null, 2), 'utf-8')

// note no `signer` needed; the selective disclosure credential will be
// derived from the base proof already provided by the issuer
//@ts-ignore
const deriveSuite = new DataIntegrityProof({
  // signer: ecdsaKeyPair.signer(),
  // date: new Date(),
  cryptosuite: createDiscloseCryptosuite({
    // the ID of the base proof to convert to a disclosure proof
    proofId: proofId,
    // selectively disclose the entire credential subject; different JSON
    // pointers could be provided to selectively disclose different information;
    // the issuer will have mandatory fields that will be automatically
    // disclosed such as the `issuer` and `issuanceDate` fields
    selectivePointers: [
      '/credentialSubject'
    ]
  })
});

const derivedOffering = await derive({
  verifiableCredential: signedOffering, suite: deriveSuite, documentLoader
});
// console.log(JSON.stringify(derivedOffering, null, 2))
await writeFile(VC_OUTPUT_FILE, JSON.stringify(derivedOffering, null, 2), 'utf-8')