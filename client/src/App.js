import React from 'react';

import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Checkout from './components/Checkout/Checkout';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <React.Fragment>

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
