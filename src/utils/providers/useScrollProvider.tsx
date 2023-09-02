// useModalProvider.tsx
import React, {
  createContext, useState,
} from 'react';

interface IScrollContext {
    scrollX: number;
    setScrollX: React.Dispatch<React.SetStateAction<number>>;
}

export const ScrollContext = createContext<IScrollContext | undefined>(undefined);

export const useScrollProvider = (): IScrollContext => {
  const [scrollX, setScrollX] = useState(0);

  return {
    scrollX,
    setScrollX,
  };
};
