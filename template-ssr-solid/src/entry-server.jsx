import { renderToString } from 'solid-js/web'
import App from './App'

/**
 * @param {string} _url
 */
export function render(_url) {
  const html = renderToString(() => <App />)
  return { html }
}
