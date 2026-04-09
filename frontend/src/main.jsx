import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom'
import { LeadProvider } from './context/LeadContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <LeadProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </LeadProvider>
  </BrowserRouter>,
)
