/* @refresh reload */
import './index.css'
import { hydrate } from 'solid-js/web'
import App from './App'

hydrate(() => <App />, document.getElementById('root') as HTMLElement)
