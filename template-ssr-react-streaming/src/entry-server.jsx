import React from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import App from './App'

export function render(url, ssrManifest, options) {
  return renderToPipeableStream(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    options
  )
}
