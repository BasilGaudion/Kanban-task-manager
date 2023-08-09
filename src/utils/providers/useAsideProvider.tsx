import React, { useState, createContext } from 'react';

interface IAsideContext {
    asideOpen: boolean;
    setAsideOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AsideContext = createContext<IAsideContext | undefined>(undefined);

export const useAsideProvider = (): IAsideContext => {
  const [asideOpen, setAsideOpen] = useState(false);

  return {
    asideOpen,
    setAsideOpen,
  };
};
