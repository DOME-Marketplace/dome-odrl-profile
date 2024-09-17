import * as util from './util.js'

const OUTPUT_FOLDER = util.joinPath(import.meta.dirname, 'tmforum')

const SCHEMA_REPOSITORY = 'https://github.com/tmforum-rand/schemas.git'
const SCHEMA_FOLDER = util.joinPath(OUTPUT_FOLDER, 'tmforum-rand-schemas')

const MODEL_REPOSITORY = 'https://github.com/FIWARE/data-models.git'
const MODEL_FOLDER = util.joinPath(OUTPUT_FOLDER, 'fiware-data-models')
const MODEL_URI = 'https://fiware.github.io/dataModels/'

if (!await util.pathExists(SCHEMA_FOLDER)) {
  console.log('cloning ' + SCHEMA_REPOSITORY)
  await util.gitClone(SCHEMA_REPOSITORY, SCHEMA_FOLDER)
}

if (!await util.pathExists(MODEL_FOLDER)) {
  console.log('cloning ' + MODEL_REPOSITORY)
  await util.gitClone(MODEL_REPOSITORY, MODEL_FOLDER)
}

const schemaFiles = await util.collectFiles(SCHEMA_FOLDER, /\.schema\.json$/, true)
const schemata = await Promise.all(schemaFiles.map(path => util.readJSON(path)))

const refs = new Set<string>()
util.traverseObject(schemata, (ref, value) => {
  if (ref.endsWith('/$ref')) refs.add(value)
})
console.dir(Array.from(refs).sort(), { maxArrayLength: 1000 })

// const schemata: Record<string, any> = { $schema: 'http://json-schema.org/draft-07/schema#' }
// for (let filePath of schemaFiles) {
//   const segments = util.relativePath(SCHEMA_FOLDER, filePath).replace(/\.schema\.json$/, '').split('/')
//   for (let target = schemata, index = 0, max = segments.length - 1; index <= max; index++) {
//     if (index < max) {
//       target = target[segments[index]] || (target[segments[index]] = {})
//     } else {
//       const schema = await util.readJSON(filePath)
//       if (Object.keys(schema.definitions).length !== 1) console.log(filePath)
//       target[segments[index]] = schema
//     }
//   }
// }
// console.log(schemata)