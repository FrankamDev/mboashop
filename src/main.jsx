import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastProvider } from "./context/ToastContext";
import './index.css'
import App from './App.jsx'
import { DarkModeProvider } from "./DarkModeContext";
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from "./context/CartContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <ToastProvider>
          <DarkModeProvider>
          <App />
          </DarkModeProvider>
        </ToastProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
document.documentElement.classList.contains("dark")