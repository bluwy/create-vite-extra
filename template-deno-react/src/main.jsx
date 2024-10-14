// @deno-types="@types/react"
import { createRoot } from 'react'
// @deno-types="@types/react-dom/client"
import { StrictMode } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
