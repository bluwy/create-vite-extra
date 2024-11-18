import renderToString from 'preact-render-to-string'
import { App } from './app'

/**
 * @param {string} _url
 */
export function render(_url) {
  const html = renderToString(<App />)
  return { html }
}
