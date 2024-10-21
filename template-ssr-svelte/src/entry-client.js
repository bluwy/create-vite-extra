import './app.css'
import { hydrate } from 'svelte'
import App from './App.svelte'

hydrate(App, {
  target: document.getElementById('app'),
})
