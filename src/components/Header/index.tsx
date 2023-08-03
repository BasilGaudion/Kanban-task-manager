import React, { useState, useContext } from 'react';
import './styles.scss';
import { LogoMobile, IconChevronDown, IconCross, IconVerticalEllipsis } from '../../assets';
import { ModalContext } from "../../utils/providers/useModalProvider";
const Header = () => {
  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    throw new Error("Task must be used within a ModalProvider");
  }

  const { showAddTask, setShowAddTask } = modalContext;

  const handleShowAddTask = () => {
    setShowAddTask(!showAddTask);
  }

  return (
    <header className='header'>
      <div className='header__container container'>
        <div className='header__left-group'>
          <img src={LogoMobile} className="header__logo" alt="Logo Mobile" />
          <h2 className='header__board-name'>Platform Launch</h2>
          <img src={IconChevronDown} alt="" />
        </div>
        <div className='header__right-group'>
          <button 
          type='button'
          className='header__add-task header__add-task--disable'
          onClick={handleShowAddTask}
          >
            +
          </button>
          <button type='button' className='header__settings'>
          <img src={IconVerticalEllipsis} className='header__ellipsis'alt="" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;