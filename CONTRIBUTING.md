# Contributing

## Setup

Run `pnpm i` to install the dependencies for all Node.js templates. You can then run each project individually with `pnpm dev`.

For Deno templates, they are installed on-the-fly when the `deno task dev` command is run. Check their project READMEs for more information.

## Update dependencies

Run `pnpm update-deps`. You may also need to update `@vitejs/plugin-react-swc` in `index.js`, and `npm:@deno/vite-plugin` in `deno.json`s manually.
