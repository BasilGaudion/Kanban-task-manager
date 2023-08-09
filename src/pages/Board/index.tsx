import React, { useEffect, useState } from 'react';
import './styles.scss';
import Header from '../../components/Header'
import Main from '../../components/Main';
import AsideSettings from '../../components/AsideSettings';
import useWindowSize from '../../hooks/useWindowSize';

const Board = () => {
  const [largeWindow, setLargeWindow] = useState(true);
  const screenWidth = useWindowSize().width;

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
      <div className='board__container'>
        <Header />
        <Main />
      </div>
    </div>
  );
};

export default Board;
