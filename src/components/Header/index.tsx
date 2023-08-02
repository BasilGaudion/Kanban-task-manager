import React from 'react';
import './styles.scss';
import { LogoMobile, IconChevronDown, IconCross, IconVerticalEllipsis } from '../../assets';
const Header = () => {

  return (
    <header className='header'>
      <div className='header__container container'>
        <div className='header__left-group'>
          <img src={LogoMobile} className="header__logo" alt="Logo Mobile" />
          <h2 className='header__board-name'>Platform Launch</h2>
          <img src={IconChevronDown} alt="" />
        </div>
        <div className='header__right-group'>
          <button type='button' className='header__add-task'>
            +
          </button>
          <img src={IconVerticalEllipsis} className='header__ellipsis'alt="" />
        </div>

      </div>
    </header>
  );
};

export default Header;