import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTheme, ThemeProvider } from "@mui/material"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from './context/AuthContext.tsx'
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:5000/api/v1"
axios.defaults.withCredentials = true;

const theme = createTheme({
  typography: { 
    fontFamily: "Roboto Slab, serif", 
    allVariants: { color: "white"},
  }})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AuthProvider>
        <BrowserRouter>
        <ThemeProvider theme={theme}>  
        </ThemeProvider>
        <App />
        </BrowserRouter>
    </AuthProvider>
    </StrictMode>
)
