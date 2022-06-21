import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => (  
        localStorage.getItem('user')
            ? <Outlet /> 
            : <Navigate to="/login" /> 
)

export default PrivateRoute;
