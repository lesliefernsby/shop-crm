/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {  ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {theme} from './theme/theme'
import App from './App';
import { store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
      </BrowserRouter>
    </Provider>
   
);

