import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Board from '../../pages/Board';
import HomePage from '../../pages/HomePage';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Board />} />
    <Route path="/home" element={<HomePage />} />
    <Route path="*" element={<Board />} />
  </Routes>
);

export default AppRoutes;
