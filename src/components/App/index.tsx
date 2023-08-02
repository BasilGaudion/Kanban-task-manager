import React from 'react';
import AppRoutes from '../../utils/AppRoutes';
import useDefaultProvider, { DefaultContext } from '../../utils/providers/useDefaultProvider';

import './styles.scss';

function App() {
  const dataDefaultContext = useDefaultProvider();

  return (
    <div className="app">
      <DefaultContext.Provider value={dataDefaultContext}>
        <AppRoutes />
      </DefaultContext.Provider>
    </div>
  );
}

export default App;
