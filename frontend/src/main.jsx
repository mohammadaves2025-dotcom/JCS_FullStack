import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { LeadProvider } from './context/LeadContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <LeadProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </LeadProvider>
  </BrowserRouter>,
)
