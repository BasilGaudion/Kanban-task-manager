import React, { useContext, useEffect, useState } from 'react';
import './styles.scss';
import Header from '../../components/Header'
import Main from '../../components/Main';
import AsideSettings from '../../components/AsideSettings';
import useWindowSize from '../../hooks/useWindowSize';
import { AsideContext } from "../../utils/providers/useAsideProvider";
import AllModals from '../../components/AllModals';

const Board = () => {
  const [largeWindow, setLargeWindow] = useState(true);
  const screenWidth = useWindowSize().width;
  const asideContext = useContext(AsideContext);

  if (!asideContext) {
    throw new Error("Task must be used within a asideProvider");
  }

  const { asideOpen, setAsideOpen } = asideContext;

  useEffect(() => {
    if (screenWidth && screenWidth >= 768) {
      setLargeWindow(true);
    } else {
      setLargeWindow(false);
    }
  }, [screenWidth]);

  return (
    <div className="board">
      {
        largeWindow
        ?
        <AsideSettings/>
        :
        <></>
      }
      <div className={`board__container ${asideOpen ? 'settings' : ''}`}>
        <Header />
        <Main />
        <AllModals/>
      </div>
    </div>
  );
};

export default Board;
