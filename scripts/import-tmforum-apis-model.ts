import { promisify } from 'node:util'
import { join, relative, dirname, basename } from 'node:path'
import { access, mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { exec } from 'node:child_process'
import { Resolver } from '@stoplight/json-ref-resolver'

const OUTPUT_FOLDER = join(import.meta.dirname, 'tmforum-apis').replace(/\\/g, '/')

// const REPO_FOLDER = join(OUTPUT_FOLDER, 'open-api-and-data-model').replace(/\\/g, '/')
// const REPO_URL = 'https://github.com/tmforum-apis/Open_Api_And_Data_Model.git'
// const SCHEMA_FOLDER = join(REPO_FOLDER, 'schemas').replace(/\\/g, '/')

const REPO_FOLDER = join(OUTPUT_FOLDER, 'tmforum-rand-schemas').replace(/\\/g, '/')
const REPO_URL = 'https://github.com/tmforum-rand/schemas.git'
const SCHEMA_FOLDER = REPO_FOLDER

const DATA_MODELS_FOLDER = join(OUTPUT_FOLDER, 'data-models').replace(/\\/g, '/')
const DATA_MODELS_URL = 'https://github.com/FIWARE/data-models.git'

const COLLECTED_SCHEMA = join(OUTPUT_FOLDER, 'collected.schema.json').replace(/\\/g, '/')
const COLLECTED_SCHEMA_DEREF = join(OUTPUT_FOLDER, 'deref.schema.json').replace(/\\/g, '/')
const MAX_ERRORS = 5

function assertNoEntError(err: unknown): asserts err is NodeJS.ErrnoException & { code: 'ENOENT' } {
  if (!(err instanceof Error)) throw new Error(typeof err === 'string' ? err : undefined)
  if ((err as NodeJS.ErrnoException).code !== 'ENOENT') throw err
}

console.group('fetching tmforum-apis/open-api-and-data-model')
try {
  await mkdir(OUTPUT_FOLDER, { recursive: true })
  await access(REPO_FOLDER)
  console.log('already cloned')
} catch (err) {
  assertNoEntError(err)
  console.log('cloning with git')
  await promisify(exec)(`git clone ${REPO_URL} ${REPO_FOLDER}`)
  console.log('successfully cloned')
}
console.groupEnd()

console.group('fetching FIWARE/data-models')
try {
  await mkdir(OUTPUT_FOLDER, { recursive: true })
  await access(DATA_MODELS_FOLDER)
  console.log('already cloned')
} catch (err) {
  assertNoEntError(err)
  console.log('cloning with git')
  await promisify(exec)(`git clone ${DATA_MODELS_URL} ${DATA_MODELS_FOLDER}`)
  console.log('successfully cloned')
}
console.groupEnd()

console.group('fetching tmforum-apis/open-api-and-data-model/schemas')
try {
  await access(COLLECTED_SCHEMA)
  console.log('already collected')
} catch (err) {
  assertNoEntError(err)
  console.log('collecting schema files')
  const schemaFiles = await readdir(SCHEMA_FOLDER, { recursive: true, withFileTypes: true })
    .then(dirents => dirents.filter(dirent => dirent.isFile() && dirent.name.endsWith('.schema.json')))
    .then(dirents => dirents.map(dirent => join(dirent.parentPath, dirent.name)))
  console.log('found ' + schemaFiles.length + ' schemata')
  const schemaCollection: Record<string, any> = { $schema: 'http://json-schema.org/draft-07/schema#' }
  for (let filePath of schemaFiles) {
    const segments = relative(SCHEMA_FOLDER, filePath).split(/[\\/]/g)
    let target: Record<string, any> = schemaCollection
    for (let i = 0, max = segments.length - 1; i <= max; i++) {
      const key = i < max ? segments[i] : segments[i].replace('.schema.json', '')
      target = target[key] || (target[key] = {})
    }
    target.$ref = relative(dirname(COLLECTED_SCHEMA), filePath).replace(/\\/g, '/')
  }
  schemaCollection.Data = {
    // fix to resolve some weird references
    Common: { $ref: relative(dirname(COLLECTED_SCHEMA), join(DATA_MODELS_FOLDER, 'common-schema.json')).replace(/\\/g, '/') },
    Geometry: { $ref: relative(dirname(COLLECTED_SCHEMA), join(DATA_MODELS_FOLDER, 'geometry-schema.json')).replace(/\\/g, '/') },
    Device: { $ref: relative(dirname(COLLECTED_SCHEMA), join(DATA_MODELS_FOLDER, 'specs/Device/device-schema.json')).replace(/\\/g, '/') },
    // UrbanMobility: { $ref: relative(dirname(COLLECTED_SCHEMA), join(DATA_MODELS_FOLDER, 'specs/UrbanMobility/gtfs-schema.json')).replace(/\\/g, '/') },
    // Alert: { $ref: relative(dirname(COLLECTED_SCHEMA), join(DATA_MODELS_FOLDER, 'specs/Alert/alert-schema.json')).replace(/\\/g, '/') },
    // Weather: { $ref: relative(dirname(COLLECTED_SCHEMA), join(DATA_MODELS_FOLDER, 'specs/Weather/weather-schema.json')).replace(/\\/g, '/') }
  }
  console.log('writing collected schema to disc')
  await writeFile(COLLECTED_SCHEMA, JSON.stringify(schemaCollection, null, 2))
}
console.groupEnd()

console.group('dereferencing collected schema')

console.log('preloading schemata')
const schemaFiles: Record<string, Record<any, any>> = Object.create(null)
await (async function preload() {
  const schemaCollection = JSON.parse(await readFile(COLLECTED_SCHEMA, 'utf-8')) as Record<string, any>
  schemaFiles[basename(COLLECTED_SCHEMA)] = schemaCollection
  await (async function traverse(target: Record<string, any>) {
    if (typeof target.$ref === 'string') {
      const filePath = join(dirname(COLLECTED_SCHEMA), target.$ref)
      const parsedFile = JSON.parse(await readFile(filePath, 'utf-8'))
      schemaFiles[target.$ref] = parsedFile
    } else {
      await Promise.all(Object.entries(target).map(async ([key, value]) => {
        if (!value || typeof value !== 'object') return
        await traverse(value)
      }))
    }
  })(schemaCollection)
})()

console.log('creating resolver')
// NOTE https://www.npmjs.com/package/@stoplight/json-ref-resolver
// NOTE https://github.com/stoplightio/json-ref-resolver/blob/HEAD/src/types.ts
const resolver = new Resolver({
  resolvers: {
    file: {
      async resolve(ref, ctx): Promise<Record<any, any>> {
        const fileRef = relative(dirname(COLLECTED_SCHEMA), ref.toString()).replace(/\\/g, '/')
        if (!schemaFiles[fileRef]) throw new Error('file not found at ' + ref.toString())
        return schemaFiles[fileRef]
      }
    }
  },
  async parseResolveResult({ result, targetAuthority }): Promise<{ result: any }> {
    if (!targetAuthority.path().endsWith('.json'))
      throw new Error('unknown file type')
    if (!result || typeof result !== 'object')
      throw new Error('invalid result object')
    return { result }
  },
  transformRef({ ref }, ctx): URI | undefined {
    if (!ref) return

    const refProtocol = ref.protocol()
    if (refProtocol.length > 0) {
      // @ts-ignore
      if (!ref._parts.urn) {
        // @ts-ignore
        const URI = ref.__proto__.constructor
        let altRef: typeof ref | undefined
        const refValue = ref.toString()
        if (refValue.startsWith('https://github.com/tmforum-rand/schemas/blob/master/')) {
          const altRefPath = relative(dirname(COLLECTED_SCHEMA), SCHEMA_FOLDER).replace(/\\/g, '/')
            + refValue.replace('https://github.com/tmforum-rand/schemas/blob/master', '')
          if (!schemaFiles[altRefPath.replace(/#.*$/, '')]) throw new Error('unknown file ref ' + altRefPath)
          const altFilePath = join(dirname(COLLECTED_SCHEMA), altRefPath).replace(/\\/g, '/')
          altRef = new URI(altFilePath)
        } else if (refValue.startsWith('https://fiware.github.io/dataModels/')) {
          const altFilePath = DATA_MODELS_FOLDER + refValue.replace('https://fiware.github.io/dataModels', '')
          altRef = new URI(altFilePath)
        } else if (refValue.startsWith('https://fiware.github.io/data-models/')) {
          const altFilePath = DATA_MODELS_FOLDER + refValue.replace('https://fiware.github.io/data-models', '')
          altRef = new URI(altFilePath)
        } else if (refValue.startsWith('http://json-schema.org/geojson/geometry.json')) {
          const altFilePath = join(DATA_MODELS_FOLDER, 'geometry-schema.json').replace(/\\/g, '/') + refValue.replace('http://json-schema.org/geojson/geometry.json', '')
          altRef = new URI(altFilePath)
        } else if (refValue.startsWith('http://geojson.org/schema/Geometry.json')) {
          const altFilePath = join(DATA_MODELS_FOLDER, 'geometry-schema.json').replace(/\\/g, '/') + refValue.replace('http://geojson.org/schema/Geometry.json', '')
          altRef = new URI(altFilePath)
        }
        if (!altRef) throw new Error('invalid ref ' + refValue)
        ref = altRef
      }
    }

    // trying to fix invalid path refs by searching for similar paths
    const refPath = ref.path()
    if (refPath.length > 0) {
      const fileRef = relative(dirname(COLLECTED_SCHEMA), refPath).replace(/\\/g, '/')
      if (!schemaFiles[fileRef]) {
        const refPathEnding = '/' + basename(fileRef)
        const schemaPaths = Object.keys(schemaFiles)
        const altFileRef = schemaPaths.find(filePath => filePath.toLowerCase() === fileRef.toLowerCase())
          || schemaPaths.find(filePath => filePath.endsWith(refPathEnding))
        if (altFileRef) {
          const altFilePath = join(dirname(COLLECTED_SCHEMA), altFileRef).replace(/\\/g, '/')
          const altRefPath = altFilePath.replace(/^[^/]*(?=\/)/, '')
          // @ts-ignore
          ref._parts.path = altRefPath
          // ref.path(altRefPath)
        }
      }
    }

    // trying to fix json refs by assuming json path to definitions on $id refs
    const refFragment = ref.fragment()
    if (refFragment.length > 0 && !refFragment.startsWith('/')) {
      ref.fragment('/definitions/' + refFragment)
    } else if (refFragment.startsWith('/') && !refFragment.startsWith('/definitions/')) {
      ref.fragment('/definitions' + refFragment)
    }

    return ref
  }
})

console.log('resolving entry schema')
const { result, errors } = await resolver.resolve({ $ref: COLLECTED_SCHEMA })

if (errors.length > 0) {
  console.log('encountered ' + errors.length + ' errors')
  if (errors.length > MAX_ERRORS) console.log('showing first ' + MAX_ERRORS + ' errors')
  for (let i = 0, max = Math.min(errors.length, MAX_ERRORS) - 1; i <= max; i++) {
    console.group('error no. ' + (i + 1) + ':')
    let error = errors[i]
    console.error('code:', error.code)
    console.error('message:', error.message)
    console.error('uri:', error.uri.toString())
    console.error('stack:')
    console.group()
    console.error('- ' + Array.from(new Set(error.uriStack)).join('\n- '))
    console.groupEnd()
    console.error('path:', '/' + error.path.join('/'))
    // console.dir(error)
    console.groupEnd()
  }
} else {
  console.log('successfully dereferenced without errors')
  // console.dir(result, { depth: 0 })
  console.log('generating dereferenced collected schema')
  const refToValue: Map<string, Record<string, any>> = new Map()
  const valueToRef: Map<Record<string, any>, string> = new Map()
  const collectedSchemaDeref = JSON.stringify(result, (key, value) => {
    if (key === '$id') return
    if (key === '$schema') return
    if (value && typeof value === 'object') {
      const ref = valueToRef.get(value) || '#'
      if (refToValue.has(ref)) {
        return { $ref: ref }
      } else {
        for (let [childKey, childValue] of Object.entries(value)) {
          if (childValue && typeof childValue === 'object') {
            const childRef = ref + '/' + childKey
            valueToRef.set(childValue, childRef)
          }
        }
        refToValue.set(ref, value)
        return value
      }
    } else {
      return value
    }
  }, 2)
  console.log('writing dereferenced schema to disc')
  await writeFile(COLLECTED_SCHEMA_DEREF, collectedSchemaDeref)
}
console.groupEnd()
