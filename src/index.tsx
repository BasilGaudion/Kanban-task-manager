import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("No element with id 'root' found");
}

const rootReactElement = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

const rootReactContainer = createRoot(rootElement);

rootReactContainer.render(rootReactElement);
