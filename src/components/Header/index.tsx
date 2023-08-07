import React, { useState, useContext } from 'react';
import './styles.scss';
import { LogoMobile, IconChevronDown, IconCross, IconVerticalEllipsis } from '../../assets';
import { ModalContext } from "../../utils/providers/useModalProvider";
import { ThemeContext } from "../../utils/providers/useThemeProvider";

const Header = () => {
  const modalContext = useContext(ModalContext);
  const themeContext = useContext(ThemeContext);

  if (!modalContext) {
    throw new Error("Task must be used within a ModalProvider");
  }

  if (!themeContext) {
    throw new Error("Task must be used within a themeProvider");
  }

  const { showAddTask, setShowAddTask, showViewBoard, setShowViewBoard, showEditBoard, setShowEditBoard } = modalContext;

  const {isDarkTheme} = themeContext;

  const handleShowAddTask = () => {
    setShowAddTask(!showAddTask);
  }

  const handleShowViewBoard = () => {
    setShowViewBoard(!showViewBoard);
  }

  const handleShowEditBoard = () => {
    setShowEditBoard(!showEditBoard);
  }

  return (
    <header className={`header ${isDarkTheme ? 'isDarkTheme' : 'isLightTheme'}`}>
      <div className='header__container container'>
        <div className='header__left-group' onClick={handleShowViewBoard}>
          <img src={LogoMobile} className="header__logo" alt="Logo Mobile" />
          <h2 className='header__board-name'>Platform Launch</h2>
          <img src={IconChevronDown} alt=""/>
        </div>
        <div className='header__right-group'>
          <button 
          type='button'
          className='header__add-task header__add-task--disable'
          onClick={handleShowAddTask}
          >
            +
          </button>
          <button type='button' className='header__settings' onClick={handleShowEditBoard}>
          <img src={IconVerticalEllipsis} className='header__ellipsis'alt="" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;