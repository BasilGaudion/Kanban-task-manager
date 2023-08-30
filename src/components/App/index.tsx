// App.tsx
import React from 'react';
import AppRoutes from '../../utils/AppRoutes';
import { useModalProvider, ModalContext } from '../../utils/providers/useModalProvider';
import { useThemeProvider, ThemeContext } from "../../utils/providers/useThemeProvider";
import { useAsideProvider, AsideContext } from "../../utils/providers/useAsideProvider";
import { useBoardProvider, BoardContext } from "../../utils/providers/useBoardProvider";
import { useLoginProvider, LoginContext } from "../../utils/providers/useLoginProvider";

import './styles.scss';

function App() {
  const dataModalContext = useModalProvider();
  const dataThemeContext = useThemeProvider();
  const dataAsideContext = useAsideProvider();
  const dataBoardContext = useBoardProvider();
  const dataLoginContext = useLoginProvider();

  return (
    <div className="app">
        <ThemeContext.Provider value={dataThemeContext}>
          <LoginContext.Provider value={dataLoginContext}>
            <BoardContext.Provider value={dataBoardContext}>
              <AsideContext.Provider value={dataAsideContext}>
                <ModalContext.Provider value={dataModalContext}>
                  <AppRoutes />
                </ModalContext.Provider>
              </AsideContext.Provider>
            </BoardContext.Provider>
          </LoginContext.Provider>
        </ThemeContext.Provider>
    </div>
  );
}

export default App;
