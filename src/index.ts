#!/usr/bin/env node

// @ts-check
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import minimist from 'minimist'
import prompts from 'prompts'
import colors from 'picocolors'

const {
  blue,
  cyan,
  green,
  redBright,
  blueBright,
  magenta,
  red,
  reset,
  yellow,
  magentaBright,
} = colors

// Avoids autoconversion to number of the project name by defining that the args
// non associated with an option ( _ ) needs to be parsed as a string. See #4606
const argv = minimist(process.argv.slice(2), {
  string: ['_'],
  boolean: ['overwrite'],
})
const cwd = process.cwd()

interface Framework {
  name: string
  display?: string
  color: (text: string) => string
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

const renameFiles: Record<string, string> = {
  _gitignore: '.gitignore',
}

async function init() {
  let targetDir = formatTargetDir(argv._[0]) as string
  const argTemplate = argv.template || argv.t

  const defaultTargetDir = 'vite-project'
  const getProjectName = () => path.basename(path.resolve(targetDir))

  let result: Record<string, any> = {}

  try {
    result = await prompts(
      [
        {
          type: targetDir ? null : 'text',
          name: 'projectName',
          message: reset('Project name:'),
          initial: defaultTargetDir,
          onState: (state) => {
            targetDir = formatTargetDir(state.value) || defaultTargetDir
          },
        },
        {
          type: () =>
            argv.overwrite
              ? null
              : !fs.existsSync(targetDir) || isEmpty(targetDir)
                ? null
                : 'confirm',
          name: 'overwrite',
          initial: argv.overwrite ? true : false,
          message: () =>
            (targetDir === '.'
              ? 'Current directory'
              : `Target directory "${targetDir}"`) +
            ` is not empty. Remove existing files and continue?`,
        },
        {
          // @ts-expect-error
          type: (_, { overwrite } = {}) => {
            if (overwrite === false) {
              throw new Error(red('✖') + ' Operation cancelled')
            }
            return null
          },
          name: 'overwriteChecker',
        },
        {
          type: () => (isValidPackageName(getProjectName()) ? null : 'text'),
          name: 'packageName',
          message: reset('Package name:'),
          initial: () => toValidPackageName(getProjectName()),
          validate: (dir) =>
            isValidPackageName(dir) || 'Invalid package.json name',
        },
        {
          type:
            argTemplate && TEMPLATES.includes(argTemplate) ? null : 'select',
          name: 'framework',
          message:
            typeof argTemplate === 'string' && !TEMPLATES.includes(argTemplate)
              ? reset(
                  `"${argTemplate}" isn't a valid template. Please choose from below: `,
                )
              : reset('Select a template:'),
          initial: 0,
          choices: FRAMEWORKS.map((framework) => {
            const frameworkColor = framework.color
            return {
              title: frameworkColor(framework.display || framework.name),
              value: framework,
            }
          }),
        },
        // Variant 1
        {
          type: (framework: Framework) =>
            framework && framework.variants ? 'select' : null,
          name: 'variant',
          message: reset('Select a variant:'),
          choices: (framework: Framework) =>
            framework.variants?.map((variant) => {
              const variantColor = variant.color
              return {
                title: variantColor(variant.display || variant.name),
                value: variant.variants ? variant : variant.name,
              }
            }),
        },
        // Variant 2
        {
          type: (framework: Framework) =>
            framework && framework.variants ? 'select' : null,
          name: 'variant',
          message: reset('Select a variant:'),
          choices: (framework: Framework) =>
            framework.variants?.map((variant) => {
              const variantColor = variant.color
              return {
                title: variantColor(variant.display || variant.name),
                value: variant.name,
              }
            }),
        },
      ],
      {
        onCancel: () => {
          throw new Error(red('✖') + ' Operation cancelled')
        },
      },
    )
  } catch (cancelled: any) {
    console.log(cancelled.message)
    return
  }

  // user choice associated with prompts
  const { framework, overwrite, packageName, variant } = result

  const root = path.join(cwd, targetDir)

  if (overwrite) {
    emptyDir(root)
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true })
  }

  // determine template
  let template = variant || framework?.name || argTemplate

  console.log(`\nScaffolding project in ${root}...`)

  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    '../..',
    `template-${template}`,
  )

  const write = (file: string, content?: string) => {
    const targetPath = renameFiles[file]
      ? path.join(root, renameFiles[file])
      : path.join(root, file)
    if (content) {
      fs.writeFileSync(targetPath, content)
    } else {
      copy(path.join(templateDir, file), targetPath)
    }
  }

  const files = fs.readdirSync(templateDir)
  for (const file of files.filter((f) => f !== 'package.json')) {
    write(file)
  }

  const isDeno = template.startsWith('deno-')
  if (isDeno) {
    console.log(`\nDone. Now run:\n`)
    if (root !== cwd) {
      console.log(`  cd ${path.relative(cwd, root)}`)
    }
    console.log('  deno task dev')
    console.log()
  } else {
    const pkg = JSON.parse(
      fs.readFileSync(path.join(templateDir, `package.json`), 'utf-8'),
    )

    pkg.name = packageName || getProjectName()

    write('package.json', JSON.stringify(pkg, null, 2))

    const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent)
    const pkgManager = pkgInfo ? pkgInfo.name : 'npm'

    console.log(`\nDone. Now run:\n`)
    if (root !== cwd) {
      console.log(`  cd ${path.relative(cwd, root)}`)
    }
    switch (pkgManager) {
      case 'yarn':
        console.log('  yarn')
        console.log('  yarn dev')
        break
      default:
        console.log(`  ${pkgManager} install`)
        console.log(`  ${pkgManager} run dev`)
        break
    }
    console.log()
  }
}

function formatTargetDir(targetDir?: string) {
  return targetDir?.trim().replace(/\/+$/g, '')
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
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(
    projectName,
  )
}

function toValidPackageName(projectName: string) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z0-9-~]+/g, '-')
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
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true })
  }
}

/**
 * @param userAgent process.env.npm_config_user_agent
 */
function pkgFromUserAgent(userAgent?: string) {
  if (!userAgent) return undefined
  const pkgSpec = userAgent.split(' ')[0]
  const pkgSpecArr = pkgSpec.split('/')
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  }
}

init().catch((e) => {
  console.error(e)
})
