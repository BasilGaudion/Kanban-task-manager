// App.tsx
import React from 'react';
import AppRoutes from '../../utils/AppRoutes';
import { useModalProvider, ModalContext } from '../../utils/providers/useModalProvider';

import './styles.scss';

function App() {
  const dataModalContext = useModalProvider();

  return (
    <div className="app">
      <ModalContext.Provider value={dataModalContext}>
        <AppRoutes />
      </ModalContext.Provider>
    </div>
  );
}

export default App;
