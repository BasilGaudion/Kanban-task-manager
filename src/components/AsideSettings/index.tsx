import React, { useContext, useState } from 'react';
import './styles.scss';
import { IconBoard, IconBoardPurple, IconHideSidebar, IconShowSidebar, LogoDark, LogoLight } from '../../assets';
import ThemeManager from '../ThemeManager';
import { ModalContext } from "../../utils/providers/useModalProvider";
import { ThemeContext } from "../../utils/providers/useThemeProvider";
import { AsideContext } from "../../utils/providers/useAsideProvider";

const AsideSettings = () => {
  const asideContext = useContext(AsideContext);
  const modalContext = useContext(ModalContext);
  const themeContext = useContext(ThemeContext);

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


  const {isDarkTheme} = themeContext;

  const { setShowAddBoard, showAddBoard } = modalContext;

  const handleShowAddBoard = () => {
    setShowAddBoard(true)
  }

  return (
    <>
      {
        asideOpen 
        ? 
        <aside className={`aside ${isDarkTheme ? 'isDarkTheme' : 'isLightTheme'}`}>
          <section className='aside__container'>
            <div className='aside__top-group'>
            <img className='aside__logo' src={isDarkTheme ? LogoLight : LogoDark} alt="" />
                <h3 className='aside__title'>All Boards (3)</h3>
                <ul className='aside__list'>
                    <li className='aside__item aside__item--current'>
                        <img src={IconBoard} alt="" />
                        <p className='aside__item-title aside__item-title--current'>Platform Launch</p>
                    </li>
                    <li className='aside__item'>
                        <img src={IconBoard} alt="" />
                        <p className='aside__item-title'>Marketing Plan</p>
                    </li>
                    <li className='aside__item'>
                        <img src={IconBoard} alt="" />
                        <p className='aside__item-title'>Roadmap</p>
                    </li>
                    <li className='aside__item aside__item--create' onClick={handleShowAddBoard}>
                        <img src={IconBoardPurple} alt="" />
                        <p className='aside__item-title aside__item-title--create'>+ Create New Board</p>
                    </li>
                </ul>
            </div>
            <div className='aside__bottom-group'>
                <ThemeManager />
                <div className='aside__hide-group' onClick={() => setAsideOpen(false)} >
                    <img src={IconHideSidebar} alt="" />
                    <p className='aside__hide-text'>Hide Sidebar</p>
                </div>
            </div>
        </section>
        </aside>
        : 
        <aside className='icon__container' onClick={() => setAsideOpen(true)} >
          <img src={IconShowSidebar} alt="" />
        </aside>
      }
    </>
  );
};

export default AsideSettings;
