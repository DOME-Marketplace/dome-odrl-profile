import { issue, defaultDocumentLoader } from '@digitalbazaar/vc'
import { Ed25519VerificationKey2020 } from '@digitalbazaar/ed25519-verification-key-2020'
import { Ed25519Signature2020 } from '@digitalbazaar/ed25519-signature-2020'
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

const suite = new Ed25519Signature2020({ key: await Ed25519VerificationKey2020.generate() })

const EXAMPLES_FOLDER = join(import.meta.dirname, '../examples')
const OFFERING_INPUT_FILE = join(EXAMPLES_FOLDER, 'product-offering-elliot-smart-city.json')
const VC_OUTPUT_FILE = join(EXAMPLES_FOLDER, 'product-offering-elliot-smart-city.vc.json')

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

//@ts-ignore // NOTE quick fix for suite error
suite.verificationMethod = () => true

const signedOffering = await issue({ credential, suite, documentLoader })
// console.log(JSON.stringify(signedOffering, null, 2))
await writeFile(VC_OUTPUT_FILE, JSON.stringify(signedOffering, null, 2), 'utf-8')