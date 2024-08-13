import { promisify } from 'node:util'
import { join } from 'node:path'
import { readFile, writeFile, rm } from 'node:fs/promises'
import { exec } from 'node:child_process'

const TSCONFIG_FILE = join(import.meta.dirname, 'tsconfig.digitalbazaar.json')
const DECLARATION_FILE = join(import.meta.dirname, 'types/digitalbazaar.d.ts')

const tsconfig = {
  include: [
    "node_modules/@digitalbazaar/**/*.js"
  ],
  compilerOptions: {
    allowJs: true,
    declaration: true,
    emitDeclarationOnly: true,
    outFile: DECLARATION_FILE,
    declarationMap: false
  }
}

await writeFile(TSCONFIG_FILE, JSON.stringify(tsconfig, null, 2))
await promisify(exec)(`npx tsc -p ${TSCONFIG_FILE}`)
await rm(TSCONFIG_FILE)

// TODO improve
const declarations = await readFile(DECLARATION_FILE, 'utf-8')
const transformed = declarations.replace(
  /declare module "([^"]*)"/g,
  (match, name) => `declare module "@digitalbazaar/${name.replace(/\/lib\/index$/, '')}"`
)
await await writeFile(DECLARATION_FILE, transformed, 'utf-8')
