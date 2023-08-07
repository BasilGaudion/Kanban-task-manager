// App.tsx
import React from 'react';
import AppRoutes from '../../utils/AppRoutes';
import { useModalProvider, ModalContext } from '../../utils/providers/useModalProvider';
import { useThemeProvider, ThemeContext } from "../../utils/providers/useThemeProvider";

import './styles.scss';

function App() {
  const dataModalContext = useModalProvider();
  const dataThemeContext = useThemeProvider();

  return (
    <div className="app">
      <ThemeContext.Provider value={dataThemeContext}>
        <ModalContext.Provider value={dataModalContext}>
          <AppRoutes />
        </ModalContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
