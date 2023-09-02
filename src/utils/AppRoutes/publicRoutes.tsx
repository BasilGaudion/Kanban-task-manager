import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function PublicRoutes() {
  const token = useAuth();
  return token ? <Navigate to="/boards" /> : <Outlet />;
}

export default PublicRoutes;
