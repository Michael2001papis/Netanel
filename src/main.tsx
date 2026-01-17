import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import './index.css'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import { ToastProvider } from './contexts/ToastContext'
import { ContactModalProvider } from './contexts/ContactModalContext'
import { SplashScreen } from './components/SplashScreen'
import { ContactModal } from './components/ContactModal'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
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
  </React.StrictMode>,
)