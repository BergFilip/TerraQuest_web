import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import { AuthProvider } from "./context/AuthContext.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AuthProvider>
          <App />
      </AuthProvider>
  </StrictMode>,
)

console.log("Root element:", document.getElementById("root"));
