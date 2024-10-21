import fs from 'node:fs/promises'
import fss from 'node:fs'
import path from 'node:path'

const cwd = process.cwd()
const denoNpmImportRe = /"npm:(.+?)@.*?"/g

// iterate each template-deno-* directories
const directories = await fs.readdir(cwd)
for (const dir of directories) {
  if (dir.startsWith('template-deno-')) {
    const denoJsonPath = path.join(cwd, dir, 'deno.json')
    const denoJsonContent = await fs.readFile(denoJsonPath, 'utf8')

    let nodeVariantPkgJsonPath = path.join(
      cwd,
      dir.replace('-deno-', '-ssr-'),
      'package.json',
    )
    if (!fss.existsSync(nodeVariantPkgJsonPath)) {
      // fallback to this by default
      nodeVariantPkgJsonPath = path.join(cwd, 'template-library/package.json')
    }
    const nodeVariantPkgJson = JSON.parse(
      await fs.readFile(nodeVariantPkgJsonPath, 'utf8'),
    )

    // replace npm:* import with nodejs variant
    const newDenoJsonContent = denoJsonContent.replace(
      denoNpmImportRe,
      (m, mod) => {
        const versionSpecifier =
          nodeVariantPkgJson.dependencies?.[mod] ??
          nodeVariantPkgJson.devDependencies?.[mod]

        if (!versionSpecifier) {
          // skip some deps for now
          if (mod === 'lit' || mod === '@deno/vite-plugin') return m
          console.error(
            `No version specifier for ${mod} in ${nodeVariantPkgJsonPath} for ${dir}`,
          )
          return m
        }

        return `"npm:${mod}@${versionSpecifier}"`
      },
    )

    await fs.writeFile(denoJsonPath, newDenoJsonContent)
    console.log(`Updated ${dir}`)
  }
}
