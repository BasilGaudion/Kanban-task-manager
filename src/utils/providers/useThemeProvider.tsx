import React, { useState, createContext } from 'react';

interface IThemeContext {
  isDarkTheme: boolean;
  setIsDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const useThemeProvider = (): IThemeContext => {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });

  return {
    isDarkTheme,
    setIsDarkTheme,
  };
};
