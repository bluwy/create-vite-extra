import renderToString from 'preact-render-to-string'
import { App } from './app'

export function render(_url: string) {
  const html = renderToString(<App />)
  return { html }
}
