import React, { useState, createContext } from 'react';

interface ILoginContext {
    isLoginVisible: boolean;
    setIsLoginVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginContext = createContext<ILoginContext | undefined>(undefined);

export const useLoginProvider = (): ILoginContext => {
  const [isLoginVisible, setIsLoginVisible] = useState(true);

  return {
    isLoginVisible,
    setIsLoginVisible,
  };
};
