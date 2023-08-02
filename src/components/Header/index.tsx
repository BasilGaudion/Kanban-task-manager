import React from 'react';
import './styles.scss';
import { LogoMobile } from '../../assets';
const Header = () => {

  return (
    <header className='header'>
      <div className='header__container'>
        <div className='header__left-group'>
          <img src={LogoMobile} alt="Logo Mobile" />
          <h2 className='header__board-name'>Platform Launch</h2>
          <svg className='header__chevron-down' width="10" height="7" xmlns="http://www.w3.org/2000/svg"><path stroke="#635FC7" stroke-width="2" fill="none" d="m1 1 4 4 4-4"/></svg>
        </div>
        <div className='header__right-group'>
          <button type='button'>
            test
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;