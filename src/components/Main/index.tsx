import React, { useState, useContext, useEffect, useRef } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
import { ModalContext } from "../../utils/providers/useModalProvider";
import { ThemeContext } from "../../utils/providers/useThemeProvider";
import { AsideContext } from "../../utils/providers/useAsideProvider";
import { BoardContext } from "../../utils/providers/useBoardProvider";
import useWindowSize from '../../hooks/useWindowSize';
import { DragDropContext } from 'react-beautiful-dnd';

// Import Swiper styles
// import 'swiper/scss';
// import 'swiper/scss/pagination';

import './styles.scss';
import Column from '../Column';

// import { Scrollbar } from 'swiper/modules';
import CreateColumn from '../CreateColumn';


const Main = () => {
  const [haveColums, setHaveColums] = useState(false);
  const themeContext = useContext(ThemeContext);
  const asideContext = useContext(AsideContext);
  const boardContext = useContext(BoardContext);
  const [largeWindow, setLargeWindow] = useState(true);
  const screenWidth = useWindowSize().width;
  const containerRef = useRef(null);

  useEffect(() => {
    if (screenWidth && screenWidth >= 768) {
      setLargeWindow(true);
    } else {
      setLargeWindow(false);
    }
  }, [screenWidth]);

  

  if (!themeContext) {
    throw new Error("Task must be used within a themeProvider");
  }

  const {isDarkTheme} = themeContext;

  if (!asideContext) {
    throw new Error("Task must be used within a asideProvider");
  }

  const { asideOpen, setAsideOpen } = asideContext;

    // ====== Board Context ==========
    if (!boardContext) {
      throw new Error("Task must be used within a asideProvider");
    }
  
    const {currentBoardData, moveTaskToColumn } = boardContext;

    useEffect(() => {
      if (currentBoardData.columns.length < 1) {
        setHaveColums(false);
      } else {
        setHaveColums(true);
      }
      }, [currentBoardData]);

    const onDragEnd = (result: any) => {
      const { destination, source, draggableId } = result;

      if (!destination) {
          return;
      }

      if (
          destination.droppableId === source.droppableId &&
          destination.index === source.index
      ) {
          return;
      }

      moveTaskToColumn(draggableId, destination.droppableId, source.index, destination.index);
    };

  return (
    <main className={`main ${isDarkTheme ? 'isDarkTheme' : 'isLightTheme'} ${asideOpen && largeWindow ? 'main--reduct' : ''}`}>
        {haveColums ? (
          <div className='main__container container' ref={containerRef}>
            <DragDropContext key={currentBoardData.id} onDragEnd={onDragEnd}>
              {currentBoardData.columns.map((column, index) => (
                <div className='main__columns' key={index}>
                  <Column key={column.id} column={column} />
                </div>
              ))}
              <div><CreateColumn/></div>
            </DragDropContext>
          </div>
        ) : (
          <div className='main__container--empty container'>
            <h3 className='main__empty-board'>This board is empty. Create a new column to get started.</h3>
            <button type='button' className='main__button-column'>+ Add New Column</button>
          </div>
        )}
    </main>
  );
  
};

export default Main;
