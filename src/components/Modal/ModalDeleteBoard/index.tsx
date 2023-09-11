import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import './styles.scss';
import { ThemeContext } from '../../../utils/providers/useThemeProvider';
import { BoardContext } from '../../../utils/providers/useBoardProvider';
import { deleteBoard } from '../../../utils/api/boardsAPI';

interface ModalDeleteBoardProps {
    handleClose: () => void;
    isOpen: boolean;
}

const ModalDeleteBoard: React.FC<ModalDeleteBoardProps> = ({ handleClose, isOpen }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [containerAnimation, setContainerAnimation] = useState('pop-in');
  const [modalAnimation, setModalAnimation] = useState('modal-open');
  const themeContext = useContext(ThemeContext);
  const boardContext = useContext(BoardContext);

  if (!boardContext) {
    throw new Error('Task must be used within a themeProvider');
  }

  const {
    currentBoardData,
    setAllBoardsData,
    allBoardsData,
    setCurrentBoardData,
  } = boardContext;

  if (!themeContext) {
    throw new Error('Task must be used within a themeProvider');
  }

  const { isDarkTheme } = themeContext;

  useEffect(() => {
    if (isOpen) {
      setContainerAnimation('pop-in');
      setModalAnimation('modal-open');
    }
    else {
      setContainerAnimation('pop-out');
      setModalAnimation('modal-closed');
    }
  }, [isOpen]);

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setContainerAnimation('pop-out');
        setModalAnimation('modal-closed');
        setTimeout(handleClose, 300);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [handleClose]);

  const handleDeleteBoard = async () => {
    if (currentBoardData._id) {
      const deletedBoard = await deleteBoard(currentBoardData._id);
      if (deletedBoard) {
        setCurrentBoardData(allBoardsData[0]);
        setAllBoardsData(allBoardsData.slice().filter((board) => board._id !== currentBoardData._id));
      }
      setContainerAnimation('pop-out');
      setModalAnimation('modal-closed');
      setTimeout(handleClose, 300);
    }
  };

  const handleCancel = () => {
    setContainerAnimation('pop-out');
    setModalAnimation('modal-closed');
    setTimeout(() => {
      handleClose();
    }, 250);
  };

  return (
    <div className={`db ${modalAnimation} ${isDarkTheme ? 'isDarkTheme' : 'isLightTheme'}`}>
      <section className={`db__container ${containerAnimation}`} ref={ref}>
        <h2 className="db__action">Delete this board ?</h2>
        <p className="db__text">
          Are you sure you want to delete the
          ‘{currentBoardData.name}’
          baord and its data ? This action cannot be reversed.
        </p>
        <div className="db__button-group">
          <button
            type="button"
            className="db__button db__button--delete"
            onClick={handleDeleteBoard}
          >
            Delete
          </button>
          <button type="button" className="db__button db__button--cancel" onClick={handleCancel}>Cancel</button>
        </div>
      </section>
    </div>
  );
};

export default ModalDeleteBoard;
