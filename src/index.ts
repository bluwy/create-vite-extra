#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { SpawnOptions } from 'node:child_process'
import spawn from 'cross-spawn'
import mri from 'mri'
import * as prompts from '@clack/prompts'
import colors from 'picocolors'

const {
  blue,
  cyan,
  green,
  redBright,
  blueBright,
  magenta,
  red,
  yellow,
  magentaBright,
} = colors

const argv = mri<{
  template?: string
  help?: boolean
  overwrite?: boolean
  immediate?: boolean
  interactive?: boolean
}>(process.argv.slice(2), {
  boolean: ['help', 'overwrite', 'immediate', 'interactive'],
  alias: { h: 'help', t: 'template', i: 'immediate' },
  string: ['template'],
})
const cwd = process.cwd()

// prettier-ignore
const helpMessage = `\
Usage: create-vite-extra [OPTION]... [DIRECTORY]

Create a new Vite project in JavaScript or TypeScript.
When running in TTY, the CLI will start in interactive mode.

Options:
  -t, --template NAME                   use a specific template
  -i, --immediate                       install dependencies and start dev
  --interactive / --no-interactive      force interactive / non-interactive mode

Available templates:
${yellow       ('ssr-vanilla-ts          ssr-vanilla'        )}
${green        ('ssr-vue-ts              ssr-vue'            )}
${green        ('ssr-vue-streaming-ts    ssr-vue-streaming'  )}
${cyan         ('ssr-react-ts            ssr-react'          )}
${cyan         ('ssr-react-streaming-ts  ssr-react-streaming')}
${magenta      ('ssr-preact-ts           ssr-preact'         )}
${red          ('ssr-svelte-ts           ssr-svelte'         )}
${blueBright   ('ssr-solid-ts            ssr-solid'          )}
${yellow       ('deno-vanilla-ts         deno-vanilla'       )}
${green        ('deno-vue-ts             deno-vue'           )}
${cyan         ('deno-react-ts           deno-react'         )}
${magenta      ('deno-preact-ts          deno-preact'        )}
${redBright    ('deno-lit-ts             deno-lit'           )}
${red          ('deno-svelte-ts          deno-svelte'        )}
${blueBright   ('deno-solid-ts           deno-solid'         )}
${magentaBright('library-ts              library'            )}
${redBright    ('ssr-transform'                              )}`

type ColorFunc = (str: string | number) => string

interface Framework {
  name: string
  display?: string
  color: ColorFunc
  variants?: Framework[]
}

const FRAMEWORKS: Framework[] = [
  {
    name: 'ssr-vanilla',
    color: yellow,
    variants: [
      {
        name: 'ssr-vanilla',
        display: 'JavaScript',
        color: yellow,
      },
      {
        name: 'ssr-vanilla-ts',
        display: 'TypeScript',
        color: blue,
      },
    ],
  },
  {
    name: 'ssr-vue',
    color: green,
    variants: [
      {
        name: 'ssr-vue-streaming',
        display: 'Streaming',
        color: green,
        variants: [
          {
            name: 'ssr-vue-streaming',
            display: 'JavaScript',
            color: yellow,
          },
          {
            name: 'ssr-vue-streaming-ts',
            display: 'TypeScript',
            color: blue,
          },
        ],
      },
      {
        name: 'ssr-vue',
        display: 'Non-streaming',
        color: green,
        variants: [
          {
            name: 'ssr-vue',
            display: 'JavaScript',
            color: yellow,
          },
          {
            name: 'ssr-vue-ts',
            display: 'TypeScript',
            color: blue,
          },
        ],
      },
    ],
  },
  {
    name: 'ssr-react',
    color: cyan,
    variants: [
      {
        name: 'ssr-react-streaming',
        display: 'Streaming',
        color: cyan,
        variants: [
          {
            name: 'ssr-react-streaming',
            display: 'JavaScript',
            color: yellow,
          },
          {
            name: 'ssr-react-streaming-ts',
            display: 'TypeScript',
            color: blue,
          },
        ],
      },
      {
        name: 'ssr-react',
        display: 'Non-streaming',
        color: cyan,
        variants: [
          {
            name: 'ssr-react',
            display: 'JavaScript',
            color: yellow,
          },
          {
            name: 'ssr-react-ts',
            display: 'TypeScript',
            color: blue,
          },
        ],
      },
    ],
  },
  {
    name: 'ssr-preact',
    color: magenta,
    variants: [
      {
        name: 'ssr-preact',
        display: 'JavaScript',
        color: yellow,
      },
      {
        name: 'ssr-preact-ts',
        display: 'TypeScript',
        color: blue,
      },
    ],
  },
  {
    name: 'ssr-svelte',
    color: red,
    variants: [
      {
        name: 'ssr-svelte',
        display: 'JavaScript',
        color: yellow,
      },
      {
        name: 'ssr-svelte-ts',
        display: 'TypeScript',
        color: blue,
      },
    ],
  },
  {
    name: 'ssr-solid',
    color: blueBright,
    variants: [
      {
        name: 'ssr-solid',
        display: 'JavaScript',
        color: yellow,
      },
      {
        name: 'ssr-solid-ts',
        display: 'TypeScript',
        color: blue,
      },
    ],
  },
  {
    name: 'deno-vanilla',
    color: yellow,
    variants: [
      {
        name: 'deno-vanilla',
        display: 'JavaScript',
        color: yellow,
      },
      {
        name: 'deno-vanilla-ts',
        display: 'TypeScript',
        color: blue,
      },
    ],
  },
  {
    name: 'deno-vue',
    color: green,
    variants: [
      {
        name: 'deno-vue',
        display: 'JavaScript',
        color: yellow,
      },
      {
        name: 'deno-vue-ts',
        display: 'TypeScript',
        color: blue,
      },
    ],
  },
  {
    name: 'deno-react',
    color: cyan,
    variants: [
      {
        name: 'deno-react',
        display: 'JavaScript',
        color: yellow,
      },
      {
        name: 'deno-react-ts',
        display: 'TypeScript',
        color: blue,
      },
    ],
  },
  {
    name: 'deno-preact',
    color: magenta,
    variants: [
      {
        name: 'deno-preact',
        display: 'JavaScript',
        color: yellow,
      },
      {
        name: 'deno-preact-ts',
        display: 'TypeScript',
        color: blue,
      },
    ],
  },
  {
    name: 'deno-lit',
    color: redBright,
    variants: [
      {
        name: 'deno-lit',
        display: 'JavaScript',
        color: yellow,
      },
      {
        name: 'deno-lit-ts',
        display: 'TypeScript',
        color: blue,
      },
    ],
  },
  {
    name: 'deno-svelte',
    color: red,
    variants: [
      {
        name: 'deno-svelte',
        display: 'JavaScript',
        color: yellow,
      },
      {
        name: 'deno-svelte-ts',
        display: 'TypeScript',
        color: blue,
      },
    ],
  },
  {
    name: 'deno-solid',
    color: blueBright,
    variants: [
      {
        name: 'deno-solid',
        display: 'JavaScript',
        color: yellow,
      },
      {
        name: 'deno-solid-ts',
        display: 'TypeScript',
        color: blue,
      },
    ],
  },
  {
    name: 'library',
    color: magentaBright,
    variants: [
      {
        name: 'library',
        display: 'JavaScript',
        color: yellow,
      },
      {
        name: 'library-ts',
        display: 'TypeScript',
        color: blue,
      },
    ],
  },
  {
    name: 'ssr-transform',
    color: redBright,
  },
]

function flattenVariants(framework: Framework): string[] {
  if (framework.variants) {
    return framework.variants.flatMap((variant) => flattenVariants(variant))
  }
  return [framework.name]
}

const TEMPLATES = FRAMEWORKS.flatMap(flattenVariants)

const renameFiles: Record<string, string | undefined> = {
  _gitignore: '.gitignore',
}

const defaultTargetDir = 'vite-project'

function run([command, ...args]: string[], options?: SpawnOptions) {
  const { status, error } = spawn.sync(command, args, options)
  if (status != null && status > 0) {
    process.exit(status)
  }

  if (error) {
    console.error(`\n${command} ${args.join(' ')} error!`)
    console.error(error)
    process.exit(1)
  }
}

function install(root: string, agent: string) {
  prompts.log.step(`Installing dependencies with ${agent}...`)
  run(getInstallCommand(agent), {
    stdio: 'inherit',
    cwd: root,
  })
}

function start(root: string, agent: string) {
  prompts.log.step('Starting dev server...')
  run(getRunCommand(agent, 'dev'), {
    stdio: 'inherit',
    cwd: root,
  })
}

async function init() {
  const argTargetDir = argv._[0]
    ? formatTargetDir(String(argv._[0]))
    : undefined
  const argTemplate = argv.template
  const argOverwrite = argv.overwrite
  const argImmediate = argv.immediate
  const argInteractive = argv.interactive

  const help = argv.help
  if (help) {
    console.log(helpMessage)
    return
  }

  const interactive = argInteractive ?? process.stdin.isTTY

  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent)
  const cancel = () => prompts.cancel('Operation cancelled')

  // 1. Get project name and target dir
  let targetDir = argTargetDir
  if (!targetDir) {
    if (interactive) {
      const projectName = await prompts.text({
        message: 'Project name:',
        defaultValue: defaultTargetDir,
        placeholder: defaultTargetDir,
        validate: (value) => {
          return !value || formatTargetDir(value).length > 0
            ? undefined
            : 'Invalid project name'
        },
      })
      if (prompts.isCancel(projectName)) return cancel()
      targetDir = formatTargetDir(projectName)
    } else {
      targetDir = defaultTargetDir
    }
  }

  // 2. Handle directory if exist and not empty
  if (fs.existsSync(targetDir) && !isEmpty(targetDir)) {
    let overwrite: 'yes' | 'no' | 'ignore' | undefined = argOverwrite
      ? 'yes'
      : undefined
    if (!overwrite) {
      if (interactive) {
        const res = await prompts.select({
          message:
            (targetDir === '.'
              ? 'Current directory'
              : `Target directory "${targetDir}"`) +
            ` is not empty. Please choose how to proceed:`,
          options: [
            {
              label: 'Cancel operation',
              value: 'no',
            },
            {
              label: 'Remove existing files and continue',
              value: 'yes',
            },
            {
              label: 'Ignore files and continue',
              value: 'ignore',
            },
          ],
        })
        if (prompts.isCancel(res)) return cancel()
        overwrite = res
      } else {
        overwrite = 'no'
      }
    }

    switch (overwrite) {
      case 'yes':
        emptyDir(targetDir)
        break
      case 'no':
        cancel()
        return
    }
  }

  // 3. Get package name
  let packageName = path.basename(path.resolve(targetDir))
  if (!isValidPackageName(packageName)) {
    if (interactive) {
      const packageNameResult = await prompts.text({
        message: 'Package name:',
        defaultValue: toValidPackageName(packageName),
        placeholder: toValidPackageName(packageName),
        validate(dir) {
          if (dir && !isValidPackageName(dir)) {
            return 'Invalid package.json name'
          }
        },
      })
      if (prompts.isCancel(packageNameResult)) return cancel()
      packageName = packageNameResult
    } else {
      packageName = toValidPackageName(packageName)
    }
  }

  // 4. Choose a framework and variant
  let template = argTemplate
  let hasInvalidArgTemplate = false
  if (argTemplate && !TEMPLATES.includes(argTemplate)) {
    template = undefined
    hasInvalidArgTemplate = true
  }
  if (!template) {
    if (interactive) {
      const framework = await prompts.select({
        message: hasInvalidArgTemplate
          ? `"${argTemplate}" isn't a valid template. Please choose from below: `
          : 'Select a framework:',
        options: FRAMEWORKS.map((framework) => {
          const frameworkColor = framework.color
          return {
            label: frameworkColor(framework.display || framework.name),
            value: framework,
          }
        }),
      })
      if (prompts.isCancel(framework)) return cancel()

      let selected = framework
      while (selected.variants) {
        const variant = await prompts.select({
          message: 'Select a variant:',
          options: selected.variants.map((next) => {
            const variantColor = next.color
            return {
              label: variantColor(next.display || next.name),
              value: next,
            }
          }),
        })
        if (prompts.isCancel(variant)) return cancel()
        selected = variant
      }

      template = selected.name
    } else {
      return prompts.cancel('No template selected, operation cancelled.')
    }
  }

  const pkgManager = pkgInfo ? pkgInfo.name : 'npm'

  const root = path.join(cwd, targetDir)
  // determine template
  let isReactCompiler = false
  if (template.includes('react-compiler')) {
    isReactCompiler = true
    template = template.replace('-compiler', '')
  }
  const isDeno = template.startsWith('deno-')

  let immediate = argImmediate
  if (isDeno) {
    // No support for now
    immediate = false
  } else if (immediate === undefined) {
    if (interactive) {
      const immediateResult = await prompts.confirm({
        message: `Install with ${pkgManager} and start now?`,
      })
      if (prompts.isCancel(immediateResult)) return cancel()
      immediate = immediateResult
    } else {
      immediate = false
    }
  }

  fs.mkdirSync(root, { recursive: true })
  prompts.log.step(`Scaffolding project in ${root}...`)

  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    '../..',
    `template-${template}`,
  )

  const write = (file: string, content?: string) => {
    const targetPath = path.join(root, renameFiles[file] ?? file)
    if (content) {
      fs.writeFileSync(targetPath, content)
    } else if (file === 'index.html') {
      const templatePath = path.join(templateDir, file)
      const templateContent = fs.readFileSync(templatePath, 'utf-8')
      const updatedContent = templateContent.replace(
        /<title>.*?<\/title>/,
        `<title>${packageName}</title>`,
      )
      fs.writeFileSync(targetPath, updatedContent)
    } else {
      copy(path.join(templateDir, file), targetPath)
    }
  }

  const files = fs.readdirSync(templateDir)
  for (const file of files.filter((f) => f !== 'package.json')) {
    write(file)
  }

  if (isDeno) {
    let doneMessage = ''
    const cdProjectName = path.relative(cwd, root)
    doneMessage += `Done. Now run:\n`
    if (root !== cwd) {
      doneMessage += `\n  cd ${
        cdProjectName.includes(' ') ? `"${cdProjectName}"` : cdProjectName
      }`
    }
    doneMessage += `\n  deno task dev`
    prompts.outro(doneMessage)
    return
  }

  const pkg = JSON.parse(
    fs.readFileSync(path.join(templateDir, `package.json`), 'utf-8'),
  )

  pkg.name = packageName

  write('package.json', JSON.stringify(pkg, null, 2) + '\n')

  if (isReactCompiler) {
    setupReactCompiler(root, template.endsWith('-ts'))
  }

  if (immediate) {
    install(root, pkgManager)
    start(root, pkgManager)
  } else {
    let doneMessage = ''
    const cdProjectName = path.relative(cwd, root)
    doneMessage += `Done. Now run:\n`
    if (root !== cwd) {
      doneMessage += `\n  cd ${
        cdProjectName.includes(' ') ? `"${cdProjectName}"` : cdProjectName
      }`
    }
    doneMessage += `\n  ${getInstallCommand(pkgManager).join(' ')}`
    doneMessage += `\n  ${getRunCommand(pkgManager, 'dev').join(' ')}`
    prompts.outro(doneMessage)
  }
}

function formatTargetDir(targetDir: string) {
  return targetDir
    .trim()
    .replace(/[<>:"\\|?*]/g, '')
    .replace(/\/+$/g, '')
}

function copy(src: string, dest: string) {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    copyDir(src, dest)
  } else {
    fs.copyFileSync(src, dest)
  }
}

function isValidPackageName(projectName: string) {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(
    projectName,
  )
}

function toValidPackageName(projectName: string) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z\d\-~]+/g, '-')
}

function copyDir(srcDir: string, destDir: string) {
  fs.mkdirSync(destDir, { recursive: true })
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file)
    const destFile = path.resolve(destDir, file)
    copy(srcFile, destFile)
  }
}

function isEmpty(path: string) {
  const files = fs.readdirSync(path)
  return files.length === 0 || (files.length === 1 && files[0] === '.git')
}

function emptyDir(dir: string) {
  if (!fs.existsSync(dir)) {
    return
  }
  for (const file of fs.readdirSync(dir)) {
    if (file === '.git') {
      continue
    }
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true })
  }
}

interface PkgInfo {
  name: string
  version: string
}

function pkgFromUserAgent(userAgent: string | undefined): PkgInfo | undefined {
  if (!userAgent) return undefined
  const pkgSpec = userAgent.split(' ')[0]
  const pkgSpecArr = pkgSpec.split('/')
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  }
}

function setupReactCompiler(root: string, isTs: boolean) {
  // renovate: datasource=npm depName=@rolldown/plugin-babel
  const babelPluginVersion = '0.2.2'
  // renovate: datasource=npm depName=babel-plugin-react-compiler
  const reactCompilerPluginVersion = '1.0.0'
  // renovate: datasource=npm depName=@babel/core
  const babelCoreVersion = '7.29.0'
  // renovate: datasource=npm depName=@types/babel__core
  const typesBabelCoreVersion = '7.20.5'

  editFile(path.resolve(root, 'package.json'), (content) => {
    const asObject = JSON.parse(content)
    const devDepsEntries = Object.entries(asObject.devDependencies)
    devDepsEntries.push(['@rolldown/plugin-babel', `^${babelPluginVersion}`])
    devDepsEntries.push([
      'babel-plugin-react-compiler',
      `^${reactCompilerPluginVersion}`,
    ])
    devDepsEntries.push(['@babel/core', `^${babelCoreVersion}`])
    if (isTs) {
      devDepsEntries.push(['@types/babel__core', `^${typesBabelCoreVersion}`])
    }
    devDepsEntries.sort()
    asObject.devDependencies = Object.fromEntries(devDepsEntries)
    return JSON.stringify(asObject, null, 2) + '\n'
  })
  editFile(
    path.resolve(root, `vite.config.${isTs ? 'ts' : 'js'}`),
    (content) => {
      return content
        .replace(
          `import react from '@vitejs/plugin-react'`,
          `import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'`,
        )
        .replace(
          '  plugins: [react()],',
          `  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],`,
        )
    },
  )
  updateReactCompilerReadme(
    root,
    'The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.\n\nNote: This will impact Vite dev & build performances.',
  )
}

function updateReactCompilerReadme(root: string, newBody: string) {
  editFile(path.resolve(root, `README.md`), (content) => {
    const h2Start = content.indexOf('## React Compiler')
    const bodyStart = content.indexOf('\n\n', h2Start)
    const compilerSectionEnd = content.indexOf('\n## ', bodyStart)
    if (h2Start === -1 || bodyStart === -1 || compilerSectionEnd === -1) {
      console.warn('Could not update compiler section in README.md')
      return content
    }
    return content.replace(
      content.slice(bodyStart + 2, compilerSectionEnd - 1),
      newBody,
    )
  })
}

function editFile(file: string, callback: (content: string) => string) {
  const content = fs.readFileSync(file, 'utf-8')
  fs.writeFileSync(file, callback(content), 'utf-8')
}

function getInstallCommand(agent: string) {
  if (agent === 'yarn') {
    return [agent]
  }
  return [agent, 'install']
}

function getRunCommand(agent: string, script: string) {
  switch (agent) {
    case 'yarn':
    case 'pnpm':
    case 'bun':
      return [agent, script]
    case 'deno':
      return [agent, 'task', script]
    default:
      return [agent, 'run', script]
  }
}

init().catch((e) => {
  console.error(e)
})
