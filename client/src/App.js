import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import ProductsList from './components/ProductsList/ProductsList';

import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Checkout from './components/Checkout/Checkout';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <React.Fragment>
      <div className="main">
        <CssBaseline />
        <Container maxWidth="lg">
          <ProductsList />
        </Container>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route exact path='/checkout' element={<PrivateRoute />}>
          <Route exact path='/checkout' element={<Checkout />} />
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
