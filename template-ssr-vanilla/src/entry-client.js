import './style.css'
import './app' // Ensure imported assets are included in the client bundle
import { setupCounter } from './counter'

setupCounter(document.querySelector('#counter'))
