import * as _ from './util.js'

const OUTPUT_FOLDER = _.joinPath(import.meta.dirname, 'tmforum')

const SCHEMA_REPOSITORY = 'https://github.com/tmforum-rand/schemas.git'
const SCHEMA_FOLDER = _.joinPath(OUTPUT_FOLDER, 'tmforum-rand-schemas')

const EXT_SCHEMA_REPOSITORY = 'https://github.com/FIWARE/data-models.git'
const EXT_SCHEMA_FOLDER = _.joinPath(OUTPUT_FOLDER, 'fiware-data-models')

if (!await _.pathExists(SCHEMA_FOLDER)) {
  console.log('cloning ' + SCHEMA_REPOSITORY)
  await _.gitClone(SCHEMA_REPOSITORY, SCHEMA_FOLDER)
}

if (!await _.pathExists(EXT_SCHEMA_FOLDER)) {
  console.log('cloning ' + EXT_SCHEMA_REPOSITORY)
  await _.gitClone(EXT_SCHEMA_REPOSITORY, EXT_SCHEMA_FOLDER)
}

const schemaFiles = [
  ...await _.collectFiles(SCHEMA_FOLDER, /\.schema\.json$/, true),
  // https://fiware.github.io/dataModels/common-schema.json
  // https://fiware.github.io/data-models/common-schema.json
  _.joinPath(EXT_SCHEMA_FOLDER, 'common-schema.json'),
  // http://geojson.org/schema/Geometry.json
  _.joinPath(EXT_SCHEMA_FOLDER, 'geometry-schema.json'),
  // https://fiware.github.io/dataModels/specs/Device/device-schema.json
  _.joinPath(EXT_SCHEMA_FOLDER, 'specs/Device/device-schema.json')
]
const schemata = await Promise.all(schemaFiles.map(path => _.readJSON(path)))

const refs = new Set<string>()
_.traverseObject(schemata, (ref, value) => {
  if (_.isRecord(value) && _.isString(value.$ref)) {
    refs.add(value.$ref)
  }
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