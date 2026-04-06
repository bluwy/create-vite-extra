import fs from 'node:fs/promises'
import fss from 'node:fs'
import path from 'node:path'

const cwd = process.cwd()
const sourceRoot = path.resolve(cwd, '../vite/packages/create-vite')
const copyEntries = ['README.md', '_gitignore', '.vscode']
const targetTemplatePrefixes = ['template-ssr-']

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

async function main() {
  if (!fss.existsSync(sourceRoot)) {
    throw new Error(`Source directory does not exist: ${sourceRoot}`)
  }

  const sourceTemplates = await fs.readdir(sourceRoot, { withFileTypes: true })

  for (const entry of sourceTemplates) {
    if (!entry.isDirectory() || !entry.name.startsWith('template-')) continue

    const sourceTemplate = entry.name
    const templateName = sourceTemplate.slice('template-'.length)
    const targetTemplates = targetTemplatePrefixes.map(
      (prefix) => `${prefix}${templateName}`,
    )

    for (const targetTemplate of targetTemplates) {
      const targetTemplatePath = path.join(cwd, targetTemplate)
      if (!fss.existsSync(targetTemplatePath)) continue

      for (const file of copyEntries) {
        const sourcePath = path.join(sourceRoot, sourceTemplate, file)
        if (!fss.existsSync(sourcePath)) continue

        const targetPath = path.join(targetTemplatePath, file)
        const isSame = await arePathsEqual(sourcePath, targetPath)
        if (isSame) continue

        const stat = await fs.stat(sourcePath)

        if (stat.isDirectory()) {
          await fs.cp(sourcePath, targetPath, { recursive: true, force: true })
        } else {
          await fs.copyFile(sourcePath, targetPath)
        }

        console.log(`${sourceTemplate} -> ${targetTemplate}: copied ${file}`)
      }
    }
  }
}

async function arePathsEqual(
  sourcePath: string,
  targetPath: string,
): Promise<boolean> {
  if (!fss.existsSync(targetPath)) return false

  const sourceStat = await fs.stat(sourcePath)
  const targetStat = await fs.stat(targetPath)

  if (sourceStat.isDirectory() !== targetStat.isDirectory()) return false
  if (sourceStat.isFile() !== targetStat.isFile()) return false

  if (sourceStat.isDirectory()) {
    const sourceEntries = await fs.readdir(sourcePath)
    const targetEntries = await fs.readdir(targetPath)

    if (sourceEntries.length !== targetEntries.length) return false

    sourceEntries.sort()
    targetEntries.sort()

    for (let i = 0; i < sourceEntries.length; i++) {
      if (sourceEntries[i] !== targetEntries[i]) return false

      const sourceChildPath = path.join(sourcePath, sourceEntries[i])
      const targetChildPath = path.join(targetPath, targetEntries[i])
      const isEqual = await arePathsEqual(sourceChildPath, targetChildPath)
      if (!isEqual) return false
    }

    return true
  }

  if (sourceStat.isFile()) {
    const [sourceContent, targetContent] = await Promise.all([
      fs.readFile(sourcePath),
      fs.readFile(targetPath),
    ])
    return sourceContent.equals(targetContent)
  }

  return false
}
