import * as vc from '@digitalbazaar/vc'
import { Ed25519VerificationKey2020 } from '@digitalbazaar/ed25519-verification-key-2020'
import { Ed25519Signature2020 } from '@digitalbazaar/ed25519-signature-2020'

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
      return vc.defaultDocumentLoader(url)
    }
  }

  return {
    documentUrl: url,
    document: contexts[url]
  }
}

const suite = new Ed25519Signature2020({
  key: await Ed25519VerificationKey2020.generate()
})

const offering = (await import('../examples/product-offering-elliot-smart-city.json')).default

const credential = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    // "https://www.w3.org/ns/credentials/v2",
    DOME_CONTEXT_V1_URL
  ],
  "id": "https://example.com/credentials/" + offering.id,
  "type": ["VerifiableCredential"],
  "issuer": offering.productSpecification.relatedParty[0].href,
  "issuanceDate": new Date().toISOString(),
  "credentialSubject": offering
}

//@ts-ignore // NOTE quick fix for suite error
suite.verificationMethod = () => true

const signedVC = await vc.issue({ credential, suite, documentLoader })
console.log(JSON.stringify(signedVC, null, 2))