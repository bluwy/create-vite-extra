import { renderToString } from 'solid-js/web'
import App from './App'

export function render(_url: string) {
  const html = renderToString(() => <App />)
  return { html }
}
