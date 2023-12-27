import { createRenderer } from 'vue-server-renderer'
import { createApp } from './main'

export async function render() {
  const { app } = createApp()
  const renderer = createRenderer()

  // @vitejs/plugin-vue injects code into a component's setup() that registers
  // itself on ctx.modules. After the render, ctx.modules would contain all the
  // components that have been instantiated during this render call.
  const ctx = {}
  const html = await renderer.renderToString(app, ctx)

  return { html }
}
