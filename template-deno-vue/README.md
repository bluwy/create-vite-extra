# Vite + Deno + Vue

## Running

You need to have Deno v1.25.4 or later intalled to run this repo.

Start a dev server:

```
$ deno task dev
```

## Deploy

Build production assets:

```
$ deno task build
```

## Notes

- You need to use `.mjs` or `.mts` extension for the `vite.config.[ext]` file.

## Papercuts

Currently there's a "papercut" for Deno users:

- peer dependencies need to be referenced in `vite.config.js` - in this example
  it is only `vue` package that needs to be referenced
