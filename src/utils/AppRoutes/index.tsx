import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Board from '../../pages/Board';
import HomePage from '../../pages/HomePage';
import PrivateRoutes from './privateRoutes';
import PublicRoutes from './publicRoutes';

const AppRoutes = () => (
  <Routes>
    <Route element={<PrivateRoutes />}>
      <Route path="/boards" element={<Board />} />
    </Route>
    <Route element={<PublicRoutes />}>
      <Route path="/home" element={<HomePage />} />
    </Route>
    {/* <Route path="*" element={<Board />} /> */}
  </Routes>
);

export default AppRoutes;
