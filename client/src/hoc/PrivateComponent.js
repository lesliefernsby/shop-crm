import React from 'react';
import { Route, Navigate } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} />
            : <Navigate to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)
