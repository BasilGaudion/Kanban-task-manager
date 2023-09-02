import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function PrivateRoutes() {
  const token = useAuth();
  return token ? <Outlet /> : <Navigate to="/home" />;
}

export default PrivateRoutes;
