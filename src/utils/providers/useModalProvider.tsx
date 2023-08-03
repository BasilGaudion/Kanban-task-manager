// useModalProvider.tsx
import React, { useState, createContext } from 'react';

interface IModalContext {
  showViewTask: boolean;
  setShowViewTask: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalContext = createContext<IModalContext | undefined>(undefined);

export const useModalProvider = (): IModalContext => {
  const [showViewTask, setShowViewTask] = useState(false);

  return {
    showViewTask,
    setShowViewTask,
  };
};
