import React, {
  useState, useContext, useEffect, useRef,
} from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { ModalContext } from '../../utils/providers/useModalProvider';
import { ThemeContext } from '../../utils/providers/useThemeProvider';
import { AsideContext } from '../../utils/providers/useAsideProvider';
import { BoardContext } from '../../utils/providers/useBoardProvider';
import { ScrollContext } from '../../utils/providers/useScrollProvider';
import useWindowSize from '../../hooks/useWindowSize';

import './styles.scss';
import Column from '../Column';

import CreateColumn from '../CreateColumn';

const Main = () => {
  const [haveColums, setHaveColums] = useState(false);
  const themeContext = useContext(ThemeContext);
  const modalContext = useContext(ModalContext);
  const asideContext = useContext(AsideContext);
  const boardContext = useContext(BoardContext);
  const [largeWindow, setLargeWindow] = useState(true);
  const screenWidth = useWindowSize().width;

  const scrollContext = useContext(ScrollContext);

  if (!scrollContext) {
    throw new Error('Main must be used within a ScrollProvider');
  }

  const { setScrollX } = scrollContext;
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const newScrollX = containerRef.current.scrollLeft;
      setScrollX(newScrollX);
    }
  };

  useEffect(() => {
    if (screenWidth && screenWidth >= 768) {
      setLargeWindow(true);
    }
    else {
      setLargeWindow(false);
    }
  }, [screenWidth]);

  if (!modalContext) {
    throw new Error('Task must be used within a ModalProvider');
  }

  const { showAddColumn, setShowAddColumn } = modalContext;

  const handleShowAddColumn = () => {
    setShowAddColumn(!showAddColumn);
  };

  if (!themeContext) {
    throw new Error('Task must be used within a themeProvider');
  }

  const { isDarkTheme } = themeContext;

  if (!asideContext) {
    throw new Error('Task must be used within a asideProvider');
  }

  const { asideOpen } = asideContext;

  // ====== Board Context ==========
  if (!boardContext) {
    throw new Error('Task must be used within a asideProvider');
  }

  //! TODO - Remeber to add moveTaskToColumn here
  const { currentBoardData } = boardContext;

  useEffect(() => {
    if (currentBoardData.columns) {
      if (currentBoardData.columns.length < 1) {
        setHaveColums(false);
      }
      else {
        setHaveColums(true);
      }
    }

  }, [currentBoardData]);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId
          && destination.index === source.index
    ) {
      // return;
    }

    // moveTaskToColumn(draggableId, destination.droppableId, source.index, destination.index);
  };

  return (
    <main className={`main ${isDarkTheme ? 'isDarkTheme' : 'isLightTheme'} ${asideOpen && largeWindow ? 'main--reduct' : ''}`}>
      {haveColums ? (
        <div className="main__container container" ref={containerRef} onScroll={handleScroll}>
          <DragDropContext
            key={currentBoardData._id}
            onDragEnd={onDragEnd}
          >
            {currentBoardData.columns.map((column) => (
              <div className="main__columns" key={column._id}>
                <Column key={column._id} column={column} />
              </div>
            ))}
            <div><CreateColumn /></div>
          </DragDropContext>
        </div>
      ) : (
        <div className="main__container--empty container">
          <h3 className="main__empty-board">This board is empty. Create a new column to get started.</h3>
          <button type="button" className="main__button-column" onClick={handleShowAddColumn}>+ Add New Column</button>
        </div>
      )}
    </main>
  );

};

export default Main;
