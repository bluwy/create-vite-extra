# create-vite-extra

## Scaffolding Your First Vite Project

> **Compatibility Note:**
> Vite requires [Node.js](https://nodejs.org) version 20.19+, 22.12+. However, some templates require a higher Node.js version to work, please upgrade if your package manager warns about it.

```bash
# npm
npm create vite-extra@latest

# pnpm
pnpm create vite-extra

# yarn
yarn create vite-extra

# bun
bun create vite-extra

# deno
deno init --npm vite-extra
```

Then follow the prompts!

You can also directly specify the project name and the template you want to use via additional command line options. For example, to scaffold a Vite + SSR + Vue project, run:

```bash
# npm
npm create vite-extra@latest my-vue-app -- --template ssr-vue

# pnpm
pnpm create vite-extra my-vue-app --template ssr-vue

# yarn
yarn create vite-extra my-vue-app --template ssr-vue

# bun
bun create vite-extra my-vue-app --template ssr-vue

# deno
deno init --npm vite-extra my-vue-app --template deno-vue
```

Currently supported template presets include:

| Template                          | Try on StackBlitz                                                                                                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `ssr-vanilla`                     | [SSR + Vanilla](https://stackblitz.com/fork/github/bluwy/create-vite-extra/tree/master/template-ssr-vanilla)                         |
| `ssr-vanilla-ts`                  | [SSR + Vanilla + TS](https://stackblitz.com/fork/github/bluwy/create-vite-extra/tree/master/template-ssr-vanilla-ts)                 |
| `ssr-vue`                         | [SSR + Vue](https://stackblitz.com/fork/github/bluwy/create-vite-extra/tree/master/template-ssr-vue)                                 |
| `ssr-vue-ts`                      | [SSR + Vue + TS](https://stackblitz.com/fork/github/bluwy/create-vite-extra/tree/master/template-ssr-vue-ts)                         |
| `ssr-vue-streaming`               | [SSR + Vue Streaming](https://stackblitz.com/fork/github/bluwy/create-vite-extra/tree/master/template-ssr-vue-streaming)             |
| `ssr-vue-streaming-ts`            | [SSR + Vue Streaming + TS](https://stackblitz.com/fork/github/bluwy/create-vite-extra/tree/master/template-ssr-vue-streaming-ts)     |
| `ssr-react`                       | [SSR + React](https://stackblitz.com/fork/github/bluwy/create-vite-extra/tree/master/template-ssr-react)                             |
| `ssr-react-ts`                    | [SSR + React + TS](https://stackblitz.com/fork/github/bluwy/create-vite-extra/tree/master/template-ssr-react-ts)                     |
| `ssr-react-streaming`             | [SSR + React Streaming](https://stackblitz.com/fork/github/bluwy/create-vite-extra/tree/master/template-ssr-react-streaming)         |
| `ssr-react-streaming-ts`          | [SSR + React Streaming + TS](https://stackblitz.com/fork/github/bluwy/create-vite-extra/tree/master/template-ssr-react-streaming-ts) |
| `ssr-react-compiler`              |                                                                                                                                      |
| `ssr-react-compiler-ts`           |                                                                                                                                      |
| `ssr-react-compiler-streaming-ts` |                                                                                                                                      |
| `ssr-react-compiler-streaming-ts` |                                                                                                                                      |
| `ssr-preact`                      | [SSR + Preact](https://stackblitz.com/fork/github/bluwy/create-vite-extra/tree/master/template-ssr-preact)                           |
| `ssr-preact-ts`                   | [SSR + Preact + TS](https://stackblitz.com/fork/github/bluwy/create-vite-extra/tree/master/template-ssr-preact-ts)                   |
| `ssr-svelte`                      | [SSR + Svelte](https://stackblitz.com/fork/github/bluwy/create-vite-extra/tree/master/template-ssr-svelte)                           |
| `ssr-svelte-ts`                   | [SSR + Svelte + TS](https://stackblitz.com/fork/github/bluwy/create-vite-extra/tree/master/template-ssr-svelte-ts)                   |
| `deno-vanilla`                    |                                                                                                                                      |
| `deno-vanilla-ts`                 |                                                                                                                                      |
| `deno-vue`                        |                                                                                                                                      |
| `deno-vue-ts`                     |                                                                                                                                      |
| `deno-react`                      |                                                                                                                                      |
| `deno-react-ts`                   |                                                                                                                                      |
| `deno-preact`                     |                                                                                                                                      |
| `deno-preact-ts`                  |                                                                                                                                      |
| `deno-lit`                        |                                                                                                                                      |
| `deno-lit-ts`                     |                                                                                                                                      |
| `deno-svelte`                     |                                                                                                                                      |
| `deno-svelte-ts`                  |                                                                                                                                      |
| `library`                         | [Library](https://stackblitz.com/fork/github/bluwy/create-vite-extra/tree/master/template-library)                                   |
| `library-ts`                      | [Library + TS](https://stackblitz.com/fork/github/bluwy/create-vite-extra/tree/master/template-library-ts)                           |
| `ssr-transform`                   | [SSR Transform](https://stackblitz.com/fork/github/bluwy/create-vite-extra/tree/master/template-ssr-transform)                       |

You can use `.` for the project name to scaffold in the current directory.

## Community Templates

create-vite-extra is a tool to quickly start a project from a basic template for popular frameworks. Check out Awesome Vite for [community maintained templates](https://github.com/vitejs/awesome-vite#templates) that include other tools or target different frameworks. You can use a tool like [tiged](https://github.com/tiged/tiged) to scaffold your project with one of the templates.

```bash
npx tiged user/project my-project
cd my-project

npm install
npm run dev
```

## Attribution

This project is originally a fork of [create-vite](https://github.com/vitejs/vite/tree/main/packages/create-vite). Credit goes to all of its contributors.
