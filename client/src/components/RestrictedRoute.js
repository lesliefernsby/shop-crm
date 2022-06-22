import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RestrictedRoute = () => {
  const loggedIn = useSelector(state => state.authentication.loggedIn);
  const isAdmin = useSelector(state => state.authentication.user)?.roles.includes('Admin');
  return (  
        loggedIn && isAdmin 
        ? <Outlet /> 
        : loggedIn ? <Navigate to="/" /> 
        : <Navigate to="/login" />
      )}

export default RestrictedRoute;
