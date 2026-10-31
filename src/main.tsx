import { createRoot } from 'react-dom/client'
import '@fontsource/chakra-petch/500.css'
import '@fontsource/chakra-petch/700.css'
import { App } from './App'
import './index.css'

// No <StrictMode>: its dev-only double mount runs the React Bits cleanup (loseContext) and the
// remount reuses the dead WebGL context, so backgrounds show as a blank white canvas in `npm run dev`.
createRoot(document.getElementById('root')!).render(<App />)
