// App.tsx
import React from 'react';
import AppRoutes from '../../utils/AppRoutes';
import { useModalProvider, ModalContext } from '../../utils/providers/useModalProvider';
import { useThemeProvider, ThemeContext } from "../../utils/providers/useThemeProvider";
import { useAsideProvider, AsideContext } from "../../utils/providers/useAsideProvider";

import './styles.scss';

function App() {
  const dataModalContext = useModalProvider();
  const dataThemeContext = useThemeProvider();
  const dataAsideContext = useAsideProvider();

  return (
    <div className="app">
      <ThemeContext.Provider value={dataThemeContext}>
        <AsideContext.Provider value={dataAsideContext}>
          <ModalContext.Provider value={dataModalContext}>
            <AppRoutes />
          </ModalContext.Provider>
        </AsideContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
