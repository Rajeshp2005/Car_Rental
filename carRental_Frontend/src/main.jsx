import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppWrapper from './AppWrapper'; // Import the AppWrapper
import { AuthProvider } from './pages/auth/AuthContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <AppWrapper />  {/* Use AppWrapper to handle routing */}
    </AuthProvider>
  </StrictMode>
);
