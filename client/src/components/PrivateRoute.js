import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const loggedIn = useSelector(state => state.authentication.loggedIn);
  return (  
        loggedIn ? <Outlet /> : <Navigate to="/login" /> 
      )}

export default PrivateRoute;
