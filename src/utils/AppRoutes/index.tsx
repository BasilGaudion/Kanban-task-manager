import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Board from '../../pages/Board';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Board />} />
    <Route path="*" element={<Board />} />
  </Routes>
);

export default AppRoutes;
