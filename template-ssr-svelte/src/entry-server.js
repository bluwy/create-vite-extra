import { render as _render } from 'svelte/server'
import App from './App.svelte'

export function render() {
  return _render(App)
}
