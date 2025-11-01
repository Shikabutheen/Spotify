import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/user.jsx'
import { SongProvider } from './context/Songcontext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <SongProvider>
        <App />
      
      </SongProvider>
      
    </UserProvider>
  </StrictMode>,
)
