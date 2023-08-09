import React, { useState, useContext, useEffect, useRef } from 'react';
import './styles.scss';
import { LogoMobile, IconChevronDown, IconCross, IconVerticalEllipsis, LogoLight, LogoDark } from '../../assets';
import { ModalContext } from "../../utils/providers/useModalProvider";
import { ThemeContext } from "../../utils/providers/useThemeProvider";
import { AsideContext } from "../../utils/providers/useAsideProvider";
import useWindowSize from '../../hooks/useWindowSize';

const Header = () => {
  const settingsRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLImageElement>(null);
  const modalContext = useContext(ModalContext);
  const themeContext = useContext(ThemeContext);
  const asideContext = useContext(AsideContext);
  const [largeWindow, setLargeWindow] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const screenWidth = useWindowSize().width;

  useEffect(() => {
    if (screenWidth && screenWidth >= 768) {
      setLargeWindow(true);
    } else {
      setLargeWindow(false);
    }
  }, [screenWidth]);

  if (!modalContext) {
    throw new Error("Task must be used within a ModalProvider");
  }

  if (!themeContext) {
    throw new Error("Task must be used within a themeProvider");
  }

  if (!asideContext) {
    throw new Error("Task must be used within a asideProvider");
  }

  const { asideOpen, setAsideOpen } = asideContext;

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

  useEffect(() => {
    const checkIfClickedOutsideSettings = (e: MouseEvent) => {

        if (isSettingsOpen && !settingsRef.current?.contains(e.target as Node) && !iconRef.current?.contains(e.target as Node)) {
            setIsSettingsOpen(false);
        }
    }

    document.addEventListener("mousedown", checkIfClickedOutsideSettings);

    return () => {
        document.removeEventListener("mousedown", checkIfClickedOutsideSettings);
    }
}, [isSettingsOpen]);

  return (
    <header className={`header ${isDarkTheme ? 'isDarkTheme' : 'isLightTheme'}`}>
      <div className='header__container container'>
        <div className='header__left-group' onClick={handleShowViewBoard}>
        {
          asideOpen 
          ? 
          (
            <>
            </>
          )
          : 
          (
            largeWindow 
            ? 
            <div className='header__logo-container'>
              <img src={isDarkTheme ? LogoLight : LogoDark} className="header__logoXl" alt="Logo Mobile" />
            </div>
            : 
            <img src={LogoMobile} className="header__logo" alt="Logo Mobile" />
          )
        }
          <h2 className='header__board-name'>Platform Launch</h2>
        {
          largeWindow 
          ? 
          <></>
          : 
          <img src={IconChevronDown} alt=""/>
        }
        </div>
        <div className='header__right-group'>
        {
          largeWindow 
          ? 
          <button 
              type='button'
              className='header__add-task header__add-task--large header__add-task--disable'
              onClick={handleShowAddTask}
          >
            + Add New Task
          </button>
          : 
          <button 
              type='button'
              className='header__add-task header__add-task--disable'
              onClick={handleShowAddTask}
          >
            +
          </button>
        }
          <div className='header__settings' onClick= {() => setIsSettingsOpen(!isSettingsOpen)} ref={iconRef}>
          <img src={IconVerticalEllipsis} className='header__ellipsis'alt="" />
          </div>
          <div className={`header__options ${isSettingsOpen ? '' : 'disable'}`} ref={settingsRef}>
              <p className='header__option' onClick={handleShowEditBoard}>Edit Board</p>
              <p className='header__option header__option--delete'>Delete Board</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;