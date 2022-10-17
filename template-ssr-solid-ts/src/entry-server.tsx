import { renderToString } from 'solid-js/web'
import App from './App'

export function render() {
  const html = renderToString(() => <App />)
  return { html }
}
