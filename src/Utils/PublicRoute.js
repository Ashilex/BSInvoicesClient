import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { getToken } from './Common';

// handle the public routes
function PublicRoute({ children, redirectTo, ...rest }) {
  console.log('sono in public route')
  // return !getToken() ? children : <Navigate to={redirectTo}/>
  return children
}

export default PublicRoute;
