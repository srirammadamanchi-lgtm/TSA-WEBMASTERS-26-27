import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/lilita-one'
import { App } from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
