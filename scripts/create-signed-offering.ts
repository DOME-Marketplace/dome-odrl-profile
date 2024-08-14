import * as vc from '@digitalbazaar/vc'
import { Ed25519VerificationKey2020 } from '@digitalbazaar/ed25519-verification-key-2020'
import { Ed25519Signature2020 } from '@digitalbazaar/ed25519-signature-2020'
import * as securityContexts from '@digitalbazaar/security-context'

type DocumentLoader = (url: string) => Promise<{
  contextUrl?: string | null,
  documentUrl: string,
  document: object,
  tag?: string
}>

const contexts = new Map([
  [securityContexts.constants.SECURITY_CONTEXT_V1_URL, securityContexts.contexts.get(securityContexts.constants.SECURITY_CONTEXT_V1_URL)],
  [securityContexts.constants.SECURITY_CONTEXT_V2_URL, securityContexts.contexts.get(securityContexts.constants.SECURITY_CONTEXT_V2_URL)]
])

function extendContextLoader(documentLoader: DocumentLoader): DocumentLoader {
  return async function (url) {
    const context = contexts.get(url);
    if (context !== undefined) return {
      contextUrl: null,
      documentUrl: url,
      document: context,
      tag: 'static'
    }
    return documentLoader(url);
  }
}

const documentLoader = extendContextLoader(async function (url) {
  if (url === 'did:test:context:foo') {
    return {
      contextUrl: null,
      documentUrl: url,
      document: {
        // myCustomContext
      }
    }
  }
  return vc.defaultDocumentLoader(url)
})

const keyPair = await Ed25519VerificationKey2020.generate()
const suite = new Ed25519Signature2020({ key: keyPair })

const credential = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://www.w3.org/2018/credentials/examples/v1"
  ],
  "id": "https://example.com/credentials/1872",
  "type": ["VerifiableCredential", "AlumniCredential"],
  "issuer": "https://example.edu/issuers/565049",
  "issuanceDate": "2010-01-01T19:23:24Z",
  "credentialSubject": {
    "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",
    "alumniOf": "Example University"
  }
}

const signedVC = await vc.issue({ credential, suite, documentLoader })
console.log(JSON.stringify(signedVC, null, 2))