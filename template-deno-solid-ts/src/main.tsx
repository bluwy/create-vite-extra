/* @refresh reload */
import { render } from 'npm:solid-js/web'

import App from './App.tsx'
import './index.css'

const root = document.getElementById('root')

if (root == null) {
  throw new Error("can not find #root element")
}	

render(() => <App />, root)
