import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {  ThemeProvider } from '@mui/material/styles';
import {theme} from './theme/theme.js'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

