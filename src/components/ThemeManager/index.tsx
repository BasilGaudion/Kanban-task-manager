import React, { useState, useContext, useEffect } from 'react';
import './styles.scss';
import { IconDarkTheme, IconLightTheme } from '../../assets';
import { ThemeContext } from "../../utils/providers/useThemeProvider";

const ThemeManager = () => {

  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("Task must be used within a ThemeProvider");
  }

  const { isDarkTheme, setIsDarkTheme } = themeContext;

  const handleThemeChange = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  useEffect(() => {
    console.log(isDarkTheme);
  }, [isDarkTheme]);

  return (
    <div className='theme'>
        <img src={IconLightTheme} alt="" />
        <input 
            type="checkbox" 
            id="switch" 
            className='theme__toggle' 
            checked={isDarkTheme} 
            onChange={handleThemeChange}
        />
        <label htmlFor="switch" className='theme__label'>Toggle</label>
        <img src={IconDarkTheme} alt="" />
    </div>
  );
};

export default ThemeManager;
