import React from 'react'

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.tsx";
import { AuthProvider } from "./controller/AuthContext.tsx";  


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <AuthProvider>
      <Provider store={store}>
     <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
    </AuthProvider>
    </React.StrictMode>
)
