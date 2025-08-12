import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import './index.css'
import App from './App.tsx'
import { MainContext, MainContextProvider } from './context/MainContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastContainer position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="dark" 
          limit={1}
          />
    <BrowserRouter>
    <MainContextProvider>
      <App />
    </MainContextProvider>
    </BrowserRouter>
  </StrictMode>,
)