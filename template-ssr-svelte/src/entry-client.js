import { hydrate } from 'svelte'
import './app.css'
import App from './App.svelte'

hydrate(App, {
  target: document.getElementById('app'),
})
