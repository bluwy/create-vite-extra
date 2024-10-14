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
const argv = minimist(process.argv.slice(2), { string: ['_'] })
const cwd = process.cwd()

const FRAMEWORKS = [
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
          {
            name: 'ssr-react-swc-streaming',
            display: 'JavaScript + SWC',
            color: yellow,
          },
          {
            name: 'ssr-react-swc-streaming-ts',
            display: 'TypeScript + SWC',
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
          {
            name: 'ssr-react-swc',
            display: 'JavaScript + SWC',
            color: yellow,
          },
          {
            name: 'ssr-react-swc-ts',
            display: 'TypeScript + SWC',
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
      {
        name: 'deno-react-swc',
        display: 'JavaScript + SWC',
        color: yellow,
      },
      {
        name: 'deno-react-swc-ts',
        display: 'TypeScript + SWC',
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

const TEMPLATES = FRAMEWORKS.map(
  (f) => (f.variants && f.variants.map((v) => v.name)) || [f.name],
).reduce((a, b) => a.concat(b), [])

const renameFiles = {
  _gitignore: '.gitignore',
}

async function init() {
  /** @type {string} */
  // @ts-ignore
  let targetDir = formatTargetDir(argv._[0])
  const argTemplate = argv.template || argv.t

  const defaultTargetDir = 'vite-project'
  const getProjectName = () =>
    targetDir === '.' ? path.basename(path.resolve()) : targetDir

  let result = {}

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
            !fs.existsSync(targetDir) || isEmpty(targetDir) ? null : 'confirm',
          name: 'overwrite',
          message: () =>
            (targetDir === '.'
              ? 'Current directory'
              : `Target directory "${targetDir}"`) +
            ` is not empty. Remove existing files and continue?`,
        },
        {
          // @ts-ignore
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
          type: (framework) =>
            framework && framework.variants ? 'select' : null,
          name: 'variant',
          message: reset('Select a variant:'),
          // @ts-ignore
          choices: (framework) =>
            framework.variants.map((variant) => {
              const variantColor = variant.color
              return {
                title: variantColor(variant.display || variant.name),
                value: variant.variants ? variant : variant.name,
              }
            }),
        },
        // Variant 2
        {
          type: (framework) =>
            framework && framework.variants ? 'select' : null,
          name: 'variant',
          message: reset('Select a variant:'),
          // @ts-ignore
          choices: (framework) =>
            framework.variants.map((variant) => {
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
  } catch (cancelled) {
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
  let isReactSwc = false
  if (template.includes('-swc')) {
    isReactSwc = true
    template = template.replace('-swc', '')
  }

  console.log(`\nScaffolding project in ${root}...`)

  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    '..',
    `template-${template}`,
  )

  const write = (file, content) => {
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
    if (isReactSwc) {
      setupReactSwc(root, { isTs: template.endsWith('-ts'), isDeno: true })
    }

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

    if (isReactSwc) {
      setupReactSwc(root, { isTs: template.endsWith('-ts'), isDeno: false })
    }

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

/**
 * @param {string | undefined} targetDir
 */
function formatTargetDir(targetDir) {
  return targetDir?.trim().replace(/\/+$/g, '')
}

function copy(src, dest) {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    copyDir(src, dest)
  } else {
    fs.copyFileSync(src, dest)
  }
}

/**
 * @param {string} projectName
 */
function isValidPackageName(projectName) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(
    projectName,
  )
}

/**
 * @param {string} projectName
 */
function toValidPackageName(projectName) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z0-9-~]+/g, '-')
}

/**
 * @param {string} srcDir
 * @param {string} destDir
 */
function copyDir(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true })
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file)
    const destFile = path.resolve(destDir, file)
    copy(srcFile, destFile)
  }
}

/**
 * @param {string} path
 */
function isEmpty(path) {
  const files = fs.readdirSync(path)
  return files.length === 0 || (files.length === 1 && files[0] === '.git')
}

/**
 * @param {string} dir
 */
function emptyDir(dir) {
  if (!fs.existsSync(dir)) {
    return
  }
  for (const file of fs.readdirSync(dir)) {
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true })
  }
}

/**
 * @param {string | undefined} userAgent process.env.npm_config_user_agent
 * @returns object | undefined
 */
function pkgFromUserAgent(userAgent) {
  if (!userAgent) return undefined
  const pkgSpec = userAgent.split(' ')[0]
  const pkgSpecArr = pkgSpec.split('/')
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  }
}

/**
 * @param {string} root
 * @param {{ isTs: boolean, isDeno: boolean }} options
 */
function setupReactSwc(root, { isTs, isDeno }) {
  if (isDeno) {
    editFile(path.resolve(root, 'deno.json'), (content) => {
      return content.replace(
        /"@vitejs\/plugin-react": ".+?"/,
        `"@vitejs/plugin-react-swc": "npm:@vitejs/plugin-react-swc@^3.7.1"`,
      )
    })
  } else {
    editFile(path.resolve(root, 'package.json'), (content) => {
      return content.replace(
        /"@vitejs\/plugin-react": ".+?"/,
        `"@vitejs/plugin-react-swc": "^3.7.1"`,
      )
    })
  }
  editFile(
    path.resolve(root, `vite.config.${isTs ? 'ts' : 'js'}`),
    (content) => {
      return content.replace('@vitejs/plugin-react', '@vitejs/plugin-react-swc')
    },
  )
}

/**
 *
 * @param {string} file
 * @param {(content: string) => string} callback
 */
function editFile(file, callback) {
  const content = fs.readFileSync(file, 'utf-8')
  fs.writeFileSync(file, callback(content), 'utf-8')
}

init().catch((e) => {
  console.error(e)
})
