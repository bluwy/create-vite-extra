import fs from 'node:fs/promises'
import fss from 'node:fs'
import path from 'node:path'

const cwd = process.cwd()
const denoNpmImportRe = /'npm:(.+?)@.*?'/g

// iterate each template-deno-* directories
const directories = await fs.readdir(cwd)
for (const dir of directories) {
  if (dir.startsWith('template-deno-')) {
    // find vite config
    let viteConfigPath = path.join(cwd, dir, 'vite.config.mts')
    if (!fss.existsSync(viteConfigPath)) {
      viteConfigPath = path.join(cwd, dir, 'vite.config.mjs')
    }
    if (!fss.existsSync(viteConfigPath)) {
      console.log(`Skipped ${dir}`)
      continue
    }

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

    const viteConfigContent = await fs.readFile(viteConfigPath, 'utf8')

    // replace npm:* import with nodejs variant
    const newViteConfigContent = viteConfigContent.replace(
      denoNpmImportRe,
      (m, mod) => {
        const versionSpecifier =
          nodeVariantPkgJson.dependencies?.[mod] ??
          nodeVariantPkgJson.devDependencies?.[mod]

        if (!versionSpecifier) {
          // skip lit for now
          if (mod === 'lit') return m
          console.error(
            `No version specifier for ${mod} in ${nodeVariantPkgJsonPath} for ${dir}`,
          )
          return m
        }

        return `'npm:${mod}@${versionSpecifier}'`
      },
    )

    await fs.writeFile(viteConfigPath, newViteConfigContent)
    console.log(`Updated ${dir}`)
  }
}
