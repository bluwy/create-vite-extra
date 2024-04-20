import React from 'react'
import { RenderToPipeableStreamOptions, renderToPipeableStream } from 'react-dom/server'
import App from './App'

export function render(_url: string, _ssrManifest: any, options: RenderToPipeableStreamOptions) {
  return renderToPipeableStream(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    options
  )
}
