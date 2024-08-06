import { promisify } from 'node:util'
import { join, relative, dirname } from 'node:path'
import { access, mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { exec } from 'node:child_process'
import { Resolver } from '@stoplight/json-ref-resolver'

const OUTPUT_FOLDER = join(import.meta.dirname, 'tmforum-apis')
const REPO_FOLDER = join(OUTPUT_FOLDER, 'open-api-and-data-model')
const REPO_URL = 'https://github.com/tmforum-apis/Open_Api_And_Data_Model.git'
const SCHEMA_FOLDER = join(REPO_FOLDER, 'schemas')
const COLLECTED_SCHEMA = join(OUTPUT_FOLDER, 'collected.schema.json')

function assertNoEntError(err: unknown): asserts err is NodeJS.ErrnoException & { code: 'ENOENT' } {
  if (!(err instanceof Error)) throw new Error(typeof err === 'string' ? err : undefined)
  if ((err as NodeJS.ErrnoException).code !== 'ENOENT') throw err
}

try {
  console.log('fetching tmforum-apis/open-api-and-data-model')
  await mkdir(OUTPUT_FOLDER, { recursive: true })
  await access(REPO_FOLDER)
  console.log('already cloned')
} catch (err) {
  assertNoEntError(err)
  console.log('cloning with git')
  await promisify(exec)(`git clone ${REPO_URL} ${REPO_FOLDER}`)
  console.log('successfully cloned')
}

try {
  console.log('fetching tmforum-apis/open-api-and-data-model/schemas')
  await access(COLLECTED_SCHEMA)
  console.log('already collected')
} catch (err) {
  assertNoEntError(err)
  console.log('collecting schema files')
  const schemaFiles = await readdir(SCHEMA_FOLDER, { recursive: true, withFileTypes: true })
    .then(dirents => dirents.filter(dirent => dirent.isFile() && dirent.name.endsWith('.schema.json')))
    .then(dirents => dirents.map(dirent => join(dirent.parentPath, dirent.name)))
  console.log('found ' + schemaFiles.length + ' schemata')
  const schemaCollection = { $schema: 'http://json-schema.org/draft-07/schema#' }
  for (let filePath of schemaFiles) {
    const segments = relative(SCHEMA_FOLDER, filePath).split(/[\\/]/g)
    let target: Record<string, any> = schemaCollection
    for (let i = 0, max = segments.length - 1; i <= max; i++) {
      const key = i < max ? segments[i] : segments[i].replace('.schema.json', '')
      target = target[key] || (target[key] = {})
    }
    target.$ref = relative(dirname(COLLECTED_SCHEMA), filePath).replace(/\\/g, '/')
  }
  console.log('writing collected schema to disc')
  await writeFile(COLLECTED_SCHEMA, JSON.stringify(schemaCollection, null, 2))
}

console.log('creating json ref resolver')
// NOTE https://www.npmjs.com/package/@stoplight/json-ref-resolver
// NOTE https://github.com/stoplightio/json-ref-resolver/blob/HEAD/src/types.ts
const resolver = new Resolver({
  resolvers: {
    file: {
      async resolve(ref, ctx): Promise<string> {
        return await readFile(ref.toString(), 'utf-8')
      }
    }
  },
  async parseResolveResult({ result, targetAuthority }): Promise<{ result: any }> {
    if (targetAuthority.path().endsWith('.json'))
      return { result: JSON.parse(result) }
    throw new Error('unknown file type')
  },
  transformRef({ ref }, ctx): URI | undefined {
    // trying to fix json refs by assuming json path to definitions on $id refs
    if (ref && ref.fragment().length > 0 && !ref.fragment().startsWith('/'))
      ref.fragment('/definitions/' + ref.fragment())
    return ref
  }
})

console.log('dereferencing collected schema')
const { result, errors } = await resolver.resolve({ $ref: COLLECTED_SCHEMA })

if (errors.length > 0) {
  console.log('encountered ' + errors.length + ' errors')
  console.error('first error:', errors[0])
  // there are many errors, because even after fixing json refs, there are many invalid references to non-existing files
} else {
  console.log('successfully dereferenced without errors')
  console.dir(result, { depth: 0 })
}
