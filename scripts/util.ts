import _util from 'node:util'
import _path from 'node:path'
import _fs from 'node:fs/promises'
import _child_process from 'node:child_process'

export function isNull(value: unknown): value is undefined | null {
  return value === undefined || value === null
}

export function isObject(value: unknown): value is Record<any, any> | Array<any> {
  return value !== null && typeof value === 'object'
}

export function isArray(value: unknown): value is Array<any> {
  return isObject(value) && Array.isArray(value)
}

export function isRecord(value: unknown): value is Record<any, any> {
  return isObject(value) && !Array.isArray(value)
}

export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export function normalizePath(path: string): string {
  return _path.normalize(path).replace(/\\/g, '/')
}

export function joinPath(...paths: string[]): string {
  return normalizePath(_path.join(...paths))
}

export function relativePath(from: string, to: string): string {
  return normalizePath(_path.relative(from, to))
}

export function parentDir(path: string): string {
  return normalizePath(_path.dirname(path))
}

export function fileName(path: string): string {
  return _path.basename(path)
}

export function dirName(path: string): string {
  return _path.basename(path)
}

export function assertNoEntError(err: unknown): asserts err is NodeJS.ErrnoException & { code: 'ENOENT' } {
  if (!(err instanceof Error)) throw new Error(typeof err === 'string' ? err : undefined)
  if ((err as NodeJS.ErrnoException).code !== 'ENOENT') throw err
}

export async function pathExists(path: string): Promise<boolean> {
  try {
    await _fs.access(path)
    return true
  } catch (err) {
    assertNoEntError(err)
    return false
  }
}

export async function fileExists(path: string): Promise<boolean> {
  try {
    const stats = await _fs.stat(path)
    if (!stats.isFile()) throw new Error('not a file')
    return true
  } catch (err) {
    assertNoEntError(err)
    return false
  }
}

export async function dirExists(path: string): Promise<boolean> {
  try {
    const stats = await _fs.stat(path)
    if (!stats.isDirectory()) throw new Error('not a directory')
    return true
  } catch (err) {
    assertNoEntError(err)
    return false
  }
}

export async function readFile(path: string): Promise<string | null> {
  try {
    return await _fs.readFile(path, 'utf-8')
  } catch (err) {
    assertNoEntError(err)
    return null
  }
}

export async function readJSON(path: string, reviver?: (key: string, value: any) => any): Promise<any | null> {
  const json = await readFile(path)
  return isNull(json) ? null : JSON.parse(json, reviver)
}

export async function writeFile(path: string, data: string): Promise<void> {
  await _fs.mkdir(_path.dirname(path), { recursive: true })
  await _fs.writeFile(path, data, 'utf-8')
}

export async function writeJSON(path: string, data: any, replacer?: (key: string, value: any) => any): Promise<void> {
  const json = JSON.stringify(data, replacer, 2)
  await writeFile(path, json)
}

export async function collectFiles(path: string, pattern?: RegExp | null, recursive?: boolean): Promise<string[]> {
  const dirents = await _fs.readdir(path, { recursive, withFileTypes: true })
  const files = dirents.filter(dirent => dirent.isFile())
  const paths = files.map(dirent => joinPath(dirent.parentPath, dirent.name))
  return pattern ? paths.filter(entry => pattern.test(entry)) : paths
}

export async function gitClone(repo: string, path: string): Promise<void> {
  await _fs.mkdir(_path.dirname(path), { recursive: true })
  const exec = _util.promisify(_child_process.exec)
  await exec(`git clone ${repo} ${path}`)
}

export function traverseObject(root: Record<any, any>, callback: (ref: string, value: any) => void) {
  const visited = new WeakSet()
  function recursiveTraversal(ref: string, value: any) {
    if (!isObject(value)) return callback(ref, value)
    if (visited.has(value)) return
    visited.add(value)
    callback(ref, value)
    Object.entries(value).forEach(entry => recursiveTraversal(ref + '/' + entry[0], entry[1]))
  }
  recursiveTraversal('#', root)
}