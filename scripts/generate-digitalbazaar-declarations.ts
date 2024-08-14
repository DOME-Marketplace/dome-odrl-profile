import { promisify } from 'node:util'
import { join, dirname } from 'node:path'
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

const generatedDeclarations = await readFile(DECLARATION_FILE, 'utf-8')
const moduleDeclarations = generatedDeclarations
  .split(/\r?\n(?=declare module)/g)
  .map(declaration => {
    const generatedName = declaration.match(/declare module "([^"]*)"/)?.[1] as string
    const moduleName = '@digitalbazaar/' + generatedName.replace(/\/lib\/index$/, '')
    return declaration
      .replace(`declare module "${generatedName}"`, `declare module "${moduleName}"`)
      .replace(/from "(\.[^"]*)"/g, (match, generatedPath) => {
        const modulePath = '@digitalbazaar/' + join(dirname(generatedName), generatedPath).replace(/\\/g, '/').replace('.js', '')
        return `from "${modulePath}"`
      })
  })
  .join('\n\n')

await await writeFile(DECLARATION_FILE, moduleDeclarations, 'utf-8')
