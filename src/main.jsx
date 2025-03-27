import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import CssBaseline from '@mui/material/CssBaseline';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import theme from './theme';
import { ToastContainer } from 'react-toastify'; // Cấu hình react-toastify
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <CssVarsProvider theme={theme}>
    <CssBaseline /> {/* Reset the default CSS styles */}
    <App />
    <ToastContainer />
  </CssVarsProvider>,
  // </StrictMode>,
);
