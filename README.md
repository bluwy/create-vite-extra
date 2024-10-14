# create-vite-extra

## Scaffolding Your First Vite Project

> **Compatibility Note:**
> Vite requires [Node.js](https://nodejs.org/en/) version 14.18+, 16+. However, some templates require a higher Node.js version to work, please upgrade if your package manager warns about it.

With NPM:

```bash
$ npm create vite-extra@latest
```

With Yarn:

```bash
$ yarn create vite-extra
```

With PNPM:

```bash
$ pnpm create vite-extra
```

With Deno:

```bash
$ deno run -A npm:create-vite-extra
```

With Bun:

```bash
$ bun create vite-extra
```

Then follow the prompts!

You can also directly specify the project name and the template you want to use via additional command line options. For example, to scaffold a Vite + SSR + Vue project, run:

```bash
# npm
npm create vite-extra@latest my-vue-app -- --template ssr-vue

# yarn
yarn create vite-extra my-vue-app --template ssr-vue

# pnpm
pnpm create vite-extra my-vue-app --template ssr-vue

# Deno
deno run -A npm:create-vite-extra --template deno-vue

# Bun
bun create vite-extra my-vue-app --template ssr-vue
```

Currently supported template presets include:

| Template                     | Try online                                                                                                           |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `ssr-vanilla`                | [StackBlitz](https://stackblitz.com/fork/github/bluwy/create-vite-extra/tree/master/template-ssr-vanilla)            |
| `ssr-vanilla-ts`             | [StackBlitz](https://stackblitz.com/fork/github/bluwy/create-vite-extra/tree/master/template-ssr-vanilla-ts)         |
| `ssr-vue`                    | [StackBlitz](https://stackblitz.com/fork/github/bluwy/create-vite-extra/tree/master/template-ssr-vue)                |
| `ssr-vue-ts`                 | [StackBlitz](https://stackblitz.com/fork/github/bluwy/create-vite-extra/tree/master/template-ssr-vue-ts)             |
| `ssr-vue-streaming`          | [StackBlitz](https://stackblitz.com/fork/github/bluwy/create-vite-extra/tree/master/template-ssr-vue-streaming)      |
| `ssr-vue-streaming-ts`       | [StackBlitz](https://stackblitz.com/fork/github/bluwy/create-vite-extra/tree/master/template-ssr-vue-streaming-ts)   |
| `ssr-react`                  | [StackBlitz](https://stackblitz.com/fork/github/bluwy/create-vite-extra/tree/master/template-ssr-react)              |
| `ssr-react-ts`               | [StackBlitz](https://stackblitz.com/fork/github/bluwy/create-vite-extra/tree/master/template-ssr-react-ts)           |
| `ssr-react-streaming`        | [StackBlitz](https://stackblitz.com/fork/github/bluwy/create-vite-extra/tree/master/template-ssr-react-streaming)    |
| `ssr-react-streaming-ts`     | [StackBlitz](https://stackblitz.com/fork/github/bluwy/create-vite-extra/tree/master/template-ssr-react-streaming-ts) |
| `ssr-react-swc`              |                                                                                                                      |
| `ssr-react-swc-ts`           |                                                                                                                      |
| `ssr-react-swc-streaming`    |                                                                                                                      |
| `ssr-react-swc-streaming-ts` |                                                                                                                      |
| `ssr-preact`                 | [StackBlitz](https://stackblitz.com/fork/github/bluwy/create-vite-extra/tree/master/template-ssr-preact)             |
| `ssr-preact-ts`              | [StackBlitz](https://stackblitz.com/fork/github/bluwy/create-vite-extra/tree/master/template-ssr-preact-ts)          |
| `ssr-svelte`                 | [StackBlitz](https://stackblitz.com/fork/github/bluwy/create-vite-extra/tree/master/template-ssr-svelte)             |
| `ssr-svelte-ts`              | [StackBlitz](https://stackblitz.com/fork/github/bluwy/create-vite-extra/tree/master/template-ssr-svelte-ts)          |
| `deno-vanilla`               |                                                                                                                      |
| `deno-vanilla-ts`            |                                                                                                                      |
| `deno-vue`                   |                                                                                                                      |
| `deno-vue-ts`                |                                                                                                                      |
| `deno-react`                 |                                                                                                                      |
| `deno-react-ts`              |                                                                                                                      |
| `deno-react-swc`             |                                                                                                                      |
| `deno-react-swc-ts`          |                                                                                                                      |
| `deno-preact`                |                                                                                                                      |
| `deno-preact-ts`             |                                                                                                                      |
| `deno-lit`                   |                                                                                                                      |
| `deno-lit-ts`                |                                                                                                                      |
| `deno-svelte`                |                                                                                                                      |
| `deno-svelte-ts`             |                                                                                                                      |
| `library`                    | [StackBlitz](https://stackblitz.com/fork/github/bluwy/create-vite-extra/tree/master/template-library)                |
| `library-ts`                 | [StackBlitz](https://stackblitz.com/fork/github/bluwy/create-vite-extra/tree/master/template-library-ts)             |
| `ssr-transform`              | [StackBlitz](https://stackblitz.com/fork/github/bluwy/create-vite-extra/tree/master/template-ssr-transform)          |

You can use `.` for the project name to scaffold in the current directory.

## Community Templates

create-vite-extra is a tool to quickly start a project from a basic template for popular frameworks. Check out Awesome Vite for [community maintained templates](https://github.com/vitejs/awesome-vite#templates) that include other tools or target different frameworks. You can use a tool like [degit](https://github.com/Rich-Harris/degit) to scaffold your project with one of the templates.

```bash
npx degit user/project my-project
cd my-project

npm install
npm run dev
```

If the project uses `main` as the default branch, suffix the project repo with `#main`

```bash
npx degit user/project#main my-project
```

## Attribution

This project is originally a fork of [create-vite](https://github.com/vitejs/vite/tree/main/packages/create-vite). Credit goes to all of its contributors.
