import React from "react";

import "./App.css";
import { Routes, Route } from "react-router-dom";
import socketClient from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Admin from "./components/Admin/Admin";
import Checkout from "./components/Checkout/Checkout";
import PrivateRoute from "./components/PrivateRoute";
import RestrictedRoute from "./components/RestrictedRoute";
import Personal from "./components/Personal/Personal";
import PersonalOrders from "./components/Personal/PersonalOrders";
import Order from "./components/Personal/Order";
import AdminChat from "./components/Admin/AdminChat";
import { chatActions } from "./redux/actions/chatActions";
import { config } from "./redux/constants";
import Favorites from "./components/Personal/Favorites";

function App() {
  const dispatch = useDispatch();
  const authentication = useSelector((state) => state.authentication);
  const socket = socketClient(config.API_URL, {
    query: {
      senderId: authentication.user.sub,
      senderName: `${authentication.user.firstName} ${authentication.user.lastName}`,
    },
  });

  socket?.on("message", (message) => {
    dispatch(chatActions.sendMessage(message));
  });

  return (
    <>
      <Navbar socket={socket} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route exact path="/checkout" element={<PrivateRoute />}>
          <Route exact path="/checkout" element={<Checkout />} />
        </Route>
        <Route exact path="/personal" element={<PrivateRoute />}>
          <Route exact path="/personal" element={<Personal />} />
        </Route>

        <Route exact path="/personal/favorites" element={<PrivateRoute />}>
          <Route exact path="/personal/favorites" element={<Favorites />} />
        </Route>

        <Route exact path="/personal/orders" element={<PrivateRoute />}>
          <Route exact path="/personal/orders" element={<PersonalOrders />} />
        </Route>

        <Route exact path="/personal/orders/:id" element={<PrivateRoute />}>
          <Route exact path="/personal/orders/:id" element={<Order />} />
        </Route>

        <Route exact path="/admin" element={<RestrictedRoute />}>
          <Route exact path="/admin" element={<Admin />} />
        </Route>

        <Route exact path="/admin/chat/:id" element={<RestrictedRoute />}>
          <Route
            exact
            path="/admin/chat/:id"
            element={<AdminChat socket={socket} />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
