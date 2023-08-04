import React from 'react';
import './styles.scss';
import { IconDarkTheme, IconLightTheme } from '../../assets';

const ThemeManager = () => {
  return (
    <div className='theme'>
        <img src={IconLightTheme} alt="" />
        <input type="checkbox" id="switch" className='theme__toggle' /><label htmlFor="switch" className='theme__label'>Toggle</label>
        <img src={IconDarkTheme} alt="" />
    </div>
  );
};

export default ThemeManager;