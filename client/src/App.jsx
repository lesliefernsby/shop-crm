import React from "react";

import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Admin from "./components/Admin/Admin";
import Checkout from "./components/Checkout/Checkout";
import PrivateRoute from "./components/PrivateRoute";
import RestrictedRoute from "./components/RestrictedRoute";

function App() {

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Home />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route exact path="/checkout" element={<PrivateRoute />}>
          <Route exact path="/checkout" element={<Checkout />} />
        </Route>
        <Route exact path="/admin" element={<RestrictedRoute />}>
          <Route exact path="/admin" element={<Admin />} />
        </Route>
      </Routes>
      <Navbar />
    </>
  );
}

export default App;
