import { spawn } from 'node:child_process'
import {
  access,
  copyFile,
  mkdir,
  readdir,
  rmdir,
  stat,
  unlink,
  utimes,
} from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const RETENTION_DAYS = 60
const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const projectDirectory = path.resolve(scriptDirectory, '..')
const currentStaticDirectory = path.join(projectDirectory, '.next', 'static')
const retainedStaticDirectory = path.join(projectDirectory, '.next-static-retention')
const retentionCutoff = Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000

async function exists(target) {
  try {
    await access(target)
    return true
  } catch {
    return false
  }
}

async function listFiles(root, directory = root) {
  if (!(await exists(directory))) return []

  const files = []
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name)
    if (entry.isDirectory()) files.push(...(await listFiles(root, absolutePath)))
    else if (entry.isFile()) files.push(path.relative(root, absolutePath))
  }
  return files
}

function safeTarget(root, relativePath) {
  const target = path.resolve(root, relativePath)
  const relativeTarget = path.relative(root, target)
  if (relativeTarget.startsWith('..') || path.isAbsolute(relativeTarget)) {
    throw new Error(`Refusing path outside static asset directory: ${relativePath}`)
  }
  return target
}

async function copyWithoutOverwrite(sourceRoot, destinationRoot, relativePath) {
  const source = safeTarget(sourceRoot, relativePath)
  const destination = safeTarget(destinationRoot, relativePath)
  if (await exists(destination)) return false

  await mkdir(path.dirname(destination), { recursive: true })
  await copyFile(source, destination)
  const sourceStat = await stat(source)
  await utimes(destination, sourceStat.atime, sourceStat.mtime)
  return true
}

async function snapshotCurrentStaticAssets() {
  const files = await listFiles(currentStaticDirectory)
  await mkdir(retainedStaticDirectory, { recursive: true })
  let copied = 0
  for (const relativePath of files) {
    if (await copyWithoutOverwrite(currentStaticDirectory, retainedStaticDirectory, relativePath)) copied++
  }
  return { copied, total: files.length }
}

async function removeEmptyDirectories(directory) {
  if (!(await exists(directory))) return
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) await removeEmptyDirectories(path.join(directory, entry.name))
  }
  if (directory !== retainedStaticDirectory && (await readdir(directory)).length === 0) {
    await rmdir(directory)
  }
}

async function pruneExpiredRetainedAssets(currentBuildFiles) {
  const retainedFiles = await listFiles(retainedStaticDirectory)
  let removed = 0
  for (const relativePath of retainedFiles) {
    const retainedPath = safeTarget(retainedStaticDirectory, relativePath)
    const retainedStat = await stat(retainedPath)
    if (retainedStat.mtimeMs >= retentionCutoff) continue

    // Cleanup is confined to the retention store. A matching current-build
    // asset remains untouched in .next/static and is asserted after merging.
    await unlink(retainedPath)
    removed++
  }
  await removeEmptyDirectories(retainedStaticDirectory)

  for (const relativePath of currentBuildFiles) {
    if (!(await exists(safeTarget(currentStaticDirectory, relativePath)))) {
      throw new Error(`Current build asset disappeared during retention cleanup: ${relativePath}`)
    }
  }
  return removed
}

async function runNextBuild() {
  const nextCli = path.join(projectDirectory, 'node_modules', 'next', 'dist', 'bin', 'next')
  const exitCode = await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [nextCli, 'build'], {
      cwd: projectDirectory,
      env: { ...process.env, NODE_OPTIONS: '--no-deprecation' },
      stdio: 'inherit',
    })
    child.on('error', reject)
    child.on('exit', (code, signal) => {
      if (signal) reject(new Error(`Next.js build terminated by ${signal}`))
      else resolve(code ?? 1)
    })
  })
  if (exitCode !== 0) throw new Error(`Next.js build failed with exit code ${exitCode}`)
}

const snapshot = await snapshotCurrentStaticAssets()
console.log(`[static-retention] Snapshotted ${snapshot.copied} new of ${snapshot.total} current static assets.`)

await runNextBuild()

const currentBuildFiles = new Set(await listFiles(currentStaticDirectory))
if (currentBuildFiles.size === 0) throw new Error('Next.js build produced no .next/static assets.')

const removed = await pruneExpiredRetainedAssets(currentBuildFiles)
const retainedFiles = await listFiles(retainedStaticDirectory)
let restored = 0
for (const relativePath of retainedFiles) {
  if (currentBuildFiles.has(relativePath)) continue
  if (await copyWithoutOverwrite(retainedStaticDirectory, currentStaticDirectory, relativePath)) restored++
}

for (const relativePath of currentBuildFiles) {
  if (!(await exists(safeTarget(currentStaticDirectory, relativePath)))) {
    throw new Error(`Current build asset missing after retention merge: ${relativePath}`)
  }
}

console.log(`[static-retention] Removed ${removed} assets older than ${RETENTION_DAYS} days.`)
console.log(`[static-retention] Restored ${restored} historical assets without overwriting ${currentBuildFiles.size} current assets.`)
