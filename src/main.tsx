import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import './index.css'
import { ConsentProvider } from './contexts/ConsentContext'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import { ToastProvider } from './contexts/ToastContext'
import { ContactModalProvider } from './contexts/ContactModalContext'
import { SplashScreen } from './components/SplashScreen'
import { ContactModal } from './components/ContactModal'
import { isMaintenanceModeEnabled } from './utils/maintenance'
import Maintenance from './pages/Maintenance'

// Check maintenance mode before rendering
// Set to true to enable maintenance mode, false to disable
const MAINTENANCE_ENABLED = false; // Change to false when ready to go live

const maintenanceEnabled = MAINTENANCE_ENABLED || isMaintenanceModeEnabled();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {maintenanceEnabled ? (
      <Maintenance />
    ) : (
      <ConsentProvider>
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <ContactModalProvider>
                <SplashScreen />
                <RouterProvider router={router} />
                <ContactModal />
              </ContactModalProvider>
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </ConsentProvider>
    )}
  </React.StrictMode>,
)