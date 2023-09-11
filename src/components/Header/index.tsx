import React, {
  useState, useContext, useEffect, useRef,
} from 'react';
import './styles.scss';
import {
  LogoMobile, IconChevronDown, IconVerticalEllipsis, LogoLight, LogoDark,
} from '../../assets';
import { ModalContext } from '../../utils/providers/useModalProvider';
import { ThemeContext } from '../../utils/providers/useThemeProvider';
import { AsideContext } from '../../utils/providers/useAsideProvider';
import { BoardContext } from '../../utils/providers/useBoardProvider';
import useWindowSize from '../../hooks/useWindowSize';

const Header = () => {
  const settingsRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLImageElement>(null);
  const modalContext = useContext(ModalContext);
  const boardContext = useContext(BoardContext);
  const themeContext = useContext(ThemeContext);
  const asideContext = useContext(AsideContext);
  const [largeWindow, setLargeWindow] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const screenWidth = useWindowSize().width;

  useEffect(() => {
    if (screenWidth && screenWidth >= 768) {
      setLargeWindow(true);
    }
    else {
      setLargeWindow(false);
    }
  }, [screenWidth]);

  // ====== Board Context ==========
  if (!boardContext) {
    throw new Error('Task must be used within a asideProvider');
  }

  const { currentBoardData } = boardContext;

  // ====== Modal Context ==========
  if (!modalContext) {
    throw new Error('Task must be used within a ModalProvider');
  }

  const {
    setShowAddBoard, showViewBoard, setShowViewBoard, showEditBoard, setShowEditBoard, showDeleteBoard, setShowDeleteBoard,
  } = modalContext;

  const handleShowAddBoard = () => {
    setShowAddBoard(true);
  };

  const handleShowViewBoard = () => {
    setShowViewBoard(!showViewBoard);
  };

  const handleShowEditBoard = () => {
    setShowEditBoard(!showEditBoard);
  };

  const handleShowDeleteBoard = () => {
    setShowDeleteBoard(!showDeleteBoard);
  };

  if (!themeContext) {
    throw new Error('Task must be used within a themeProvider');
  }

  const { isDarkTheme } = themeContext;

  // ====== Aside Context ==========
  if (!asideContext) {
    throw new Error('Task must be used within a asideProvider');
  }

  const { asideOpen } = asideContext;

  useEffect(() => {
    const checkIfClickedOutsideSettings = (e: MouseEvent) => {

      if (isSettingsOpen && !settingsRef.current?.contains(e.target as Node) && !iconRef.current?.contains(e.target as Node)) {
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutsideSettings);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutsideSettings);
    };
  }, [isSettingsOpen]);

  return (
    <header className={`header ${isDarkTheme ? 'isDarkTheme' : 'isLightTheme'} ${asideOpen && largeWindow ? 'header--reduct' : ''}`}>
      <div className="header__container container">
        <div className="header__left-group" onClick={handleShowViewBoard}>
          {
          asideOpen
            ? (
              <>
              </>
            )
            : (
              largeWindow
                ? (
                  <div className="header__logo-container">
                    <img src={isDarkTheme ? LogoLight : LogoDark} className="header__logoXl" alt="Logo Mobile" />
                  </div>
                )
                : <img src={LogoMobile} className="header__logo" alt="Logo Mobile" />
            )
        }
          <h2 className="header__board-name" onClick={largeWindow ? handleShowEditBoard : handleShowViewBoard}>{currentBoardData.name}</h2>
          {
          largeWindow
            ? <></>
            : <img src={IconChevronDown} alt="" />
        }
        </div>
        <div className="header__right-group">
          {
          largeWindow
            ? (
              <button
                type="button"
                className="header__add-task header__add-task--large"
                onClick={handleShowAddBoard}
              >
                + Create New Board
              </button>
            )
            : (
              <button
                type="button"
                className="header__add-task"
                onClick={handleShowAddBoard}
              >
                +
              </button>
            )
        }
          <div className="header__settings" onClick={() => setIsSettingsOpen(!isSettingsOpen)} ref={iconRef}>
            <img src={IconVerticalEllipsis} className="header__ellipsis" alt="" />
          </div>
          <div className={`header__options ${isSettingsOpen ? '' : 'disable'}`} ref={settingsRef}>
            <p className="header__option" onClick={handleShowEditBoard}>Edit Board</p>
            <p className="header__option header__option--delete" onClick={handleShowDeleteBoard}>Delete Board</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
