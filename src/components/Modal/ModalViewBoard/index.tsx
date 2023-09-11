import React, {
  useEffect, useRef, useState, useContext,
} from 'react';
import './styles.scss';
import { IconBoard, IconBoardPurple } from '../../../assets';
import ThemeManager from '../../ThemeManager';
import { ModalContext } from '../../../utils/providers/useModalProvider';
import { ThemeContext } from '../../../utils/providers/useThemeProvider';
import useWindowSize from '../../../hooks/useWindowSize';
import { BoardContext } from '../../../utils/providers/useBoardProvider';
import { Board } from '../../../utils/Types/BoardTypes';

interface ModalViewBoardProps {
    handleClose: () => void;
    isOpen: boolean;
}

const ModalViewBoard: React.FC<ModalViewBoardProps> = ({ handleClose, isOpen }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [largeWindow, setLargeWindow] = useState(true);
  const screenWidth = useWindowSize().width;
  const [containerAnimation, setContainerAnimation] = useState('go-down');
  const [modalAnimation, setModalAnimation] = useState('modal-open');
  const boardContext = useContext(BoardContext);
  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    throw new Error('Task must be used within a ModalProvider');
  }

  const { showAddBoard, setShowAddBoard } = modalContext;

  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('Task must be used within a themeProvider');
  }

  const { isDarkTheme } = themeContext;

  if (!boardContext) {
    throw new Error('Task must be used within a asideProvider');
  }

  const { allBoardsData, currentBoardData, setCurrentBoardData } = boardContext;

  useEffect(() => {
    if (screenWidth && screenWidth >= 768) {
      setLargeWindow(true);
    }
    else {
      setLargeWindow(false);
    }
  }, [screenWidth]);

  useEffect(() => {
    if (isOpen) {
      setContainerAnimation('go-down');
      setModalAnimation('modal-open');
    }
    else {
      setContainerAnimation('go-up');
      setModalAnimation('modal-closed');
    }
  }, [isOpen]);

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setContainerAnimation('go-up');
        setModalAnimation('modal-closed');
        setTimeout(handleClose, 300);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [handleClose]);

  const handleShowAddBoard = () => {
    setContainerAnimation('go-up');
    setModalAnimation('modal-closed');
    setTimeout(() => {
      setShowAddBoard(!showAddBoard);
      handleClose();
    }, 250);
  };

  return (
    <div>
      {
        largeWindow
          ? <></>
          : (
            <div className={`vb ${modalAnimation} ${isDarkTheme ? 'isDarkTheme' : 'isLightTheme'}`}>
              <section className={`vb__container ${containerAnimation}`} ref={ref}>
                <h3 className="vb__title">All Boards (3)</h3>
                <ul className="vb__list">
                  <li className="vb__item vb__item--create" onClick={handleShowAddBoard}>
                    <img src={IconBoardPurple} alt="" />
                    <p className="vb__item-title vb__item-title--create">+ Create New Board</p>
                  </li>
                  {
                allBoardsData
                  ?.sort((a: Board, b: Board) => new Date(b.updatedAt ?? '1970-01-01T00:00:00Z').getTime()
                    - new Date(a.updatedAt ?? '1970-01-01T00:00:00Z').getTime())
                  .map((item: Board, index: number) => {
                    return (
                      <li
                        className={`vb__item ${item._id === currentBoardData._id ? 'vb__item--current' : ''}`}
                        key={index}
                        onClick={() => {
                          setCurrentBoardData(item);
                        }}
                      >
                        <img src={IconBoard} alt="" />
                        <p className={`vb__item-title ${item._id === currentBoardData._id ? 'vb__item-title--current' : ''}`}>{item.name}</p>
                      </li>
                    );
                  })
              }
                </ul>
                <ThemeManager />
              </section>
            </div>
          )
      }

    </div>
  );
};

export default ModalViewBoard;
