import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Checkout from './components/Checkout/Checkout';
import { PrivateRoute } from './hoc/PrivateComponent';

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <PrivateRoute exact path="/checkout" element={<Checkout />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
