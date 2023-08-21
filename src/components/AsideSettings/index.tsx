import React, { useContext, useEffect, useState } from 'react';
import './styles.scss';
import { IconBoard, IconBoardPurple, IconHidePurple, IconHideSidebar, IconShowSidebar, LogoDark, LogoLight } from '../../assets';
import ThemeManager from '../ThemeManager';
import { ModalContext } from "../../utils/providers/useModalProvider";
import { ThemeContext } from "../../utils/providers/useThemeProvider";
import { AsideContext } from "../../utils/providers/useAsideProvider";
import { BoardContext } from "../../utils/providers/useBoardProvider";
import useWindowSize from '../../hooks/useWindowSize';

const AsideSettings = () => {
  const asideContext = useContext(AsideContext);
  const modalContext = useContext(ModalContext);
  const themeContext = useContext(ThemeContext);
  const boardContext = useContext(BoardContext);
  const screenWidth = useWindowSize().width;

// ====== Modal Context ==========
  if (!modalContext) {
    throw new Error("Task must be used within a ModalProvider");
  }
  const { setShowAddBoard, showAddBoard } = modalContext;

  const handleShowAddBoard = () => {
    setShowAddBoard(true)
  }

  // ====== Theme Context ==========
  if (!themeContext) {
    throw new Error("Task must be used within a themeProvider");
  }
  const {isDarkTheme} = themeContext;

  // ====== Aside Context ==========
  if (!asideContext) {
    throw new Error("Task must be used within a asideProvider");
  }
  const { asideOpen, setAsideOpen } = asideContext;

  useEffect(() => {
    if(screenWidth) {
      if (screenWidth < 768) {
        setAsideOpen(false)
      }
    }
  }, [screenWidth]);

  // ====== Board Context ==========
  if (!boardContext) {
    throw new Error("Task must be used within a asideProvider");
  }

  const {allBoardsName, setCurrentBoard, currentBoard} = boardContext;


  return (
    <>
        <aside className={`aside ${isDarkTheme ? 'isDarkTheme' : 'isLightTheme'} ${asideOpen ? '' : 'hidden'}`}>
          <section className='aside__container'>
            <div className='aside__top-group'>
            <img className='aside__logo' src={isDarkTheme ? LogoLight : LogoDark} alt="" />
                <h3 className='aside__title'>All Boards ({allBoardsName.length})</h3>
                <ul className='aside__list'>

                {allBoardsName.map((item, index) => {
                    return (
                        <li 
                        className={`aside__item ${item === currentBoard ? 'aside__item--current' : ''}`} 
                        key={index} 
                        onClick={() => {
                          setCurrentBoard(item);
                        }}>
                            <img src={IconBoard} alt="" />
                            <p className={`aside__item-title ${item === currentBoard ? 'aside__item-title--current' : ''}`}>{item}</p>
                        </li>
                    );
                })}
                    <li className='aside__item aside__item--create' onClick={handleShowAddBoard}>
                        <img src={IconBoardPurple} alt="" />
                        <p className='aside__item-title aside__item-title--create'>+ Create New Board</p>
                    </li>
                </ul>
            </div>
            <div className='aside__bottom-group'>
                <ThemeManager />
                <div className='aside__hide-group' onClick={() => setAsideOpen(false)} >
                  <img className="aside__icon-default" src={IconHideSidebar} alt="" />
                  <img className="aside__icon-hover" src={IconHidePurple} alt="" />
                    <p className='aside__hide-text'>Hide Sidebar</p>
                </div>
            </div>
        </section>
        </aside>
        <aside className='icon__container' onClick={() => setAsideOpen(true)} >
          <img src={IconShowSidebar} alt="" />
        </aside>
    </>
  );
};

export default AsideSettings;