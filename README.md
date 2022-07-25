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

Then follow the prompts!

You can also directly specify the project name and the template you want to use via additional command line options. For example, to scaffold a Vite + SSR + Vue project, run:

```bash
# npm
npm create vite-extra@latest my-vue-app -- --template ssr-vue

# yarn
yarn create vite-extra my-vue-app --template ssr-vue

# pnpm
pnpm create vite-extra my-vue-app --template ssr-vue
```

Currently supported template presets include:

- `ssr-vanilla`
- `ssr-vanilla-ts`
- `ssr-vue`
- `ssr-vue-ts`
- `ssr-react`
- `ssr-react-ts`
- `ssr-preact`
- `ssr-preact-ts`
- `ssr-svelte`
- `ssr-svelte-ts`
- `ssr-transform`

You can use `.` for the project name to scaffold in the current directory.

## Community Templates

create-vite is a tool to quickly start a project from a basic template for popular frameworks. Check out Awesome Vite for [community maintained templates](https://github.com/vitejs/awesome-vite#templates) that include other tools or target different frameworks. You can use a tool like [degit](https://github.com/Rich-Harris/degit) to scaffold your project with one of the templates.

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
