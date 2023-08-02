import { createContext, useState } from 'react';

export const DefaultContext = createContext({});

const useDefaultProvider = () => {
  const [stateName, setStateName] = useState();

  return {
    stateName,
    setStateName,
  };
};

export default useDefaultProvider;
