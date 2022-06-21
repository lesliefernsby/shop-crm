import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {  ThemeProvider } from '@mui/material/styles';
import {theme} from './theme/theme.js'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

