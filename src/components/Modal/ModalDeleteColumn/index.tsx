import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import './styles.scss';
import { ThemeContext } from '../../../utils/providers/useThemeProvider';
import { BoardContext } from '../../../utils/providers/useBoardProvider';
import { ModalContext } from '../../../utils/providers/useModalProvider';
import { deleteColumn } from '../../../utils/api/columnsAPI';

interface ModalDeleteColumnProps {
    handleClose: () => void;
    isOpen: boolean;
}

const ModalDeleteColumn: React.FC<ModalDeleteColumnProps> = ({ handleClose, isOpen }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [containerAnimation, setContainerAnimation] = useState('pop-in');
  const [modalAnimation, setModalAnimation] = useState('modal-open');
  const themeContext = useContext(ThemeContext);
  const boardContext = useContext(BoardContext);
  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    throw new Error('Task must be used within a ModalProvider');
  }

  const {
    showEditColumn, setShowEditColumn,
  } = modalContext;

  if (!boardContext) {
    throw new Error('Task must be used within a themeProvider');
  }

  const {
    currentBoardData,
    setAllBoardsData,
    allBoardsData,
    setCurrentBoardData,
    currentColumnData,
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

  const handleDeleteColumn = async () => {
    if (currentBoardData._id && currentColumnData._id) {
      const deletedColumn = await deleteColumn(currentBoardData._id, currentColumnData._id);
      if (deletedColumn) {
        setAllBoardsData((prev) => {
          const newBoards = [...prev];
          const boardIndex = newBoards.findIndex((board) => board._id === currentBoardData._id);
          newBoards[boardIndex].columns = newBoards[boardIndex].columns.filter((column) => column._id !== currentColumnData._id);
          return newBoards;
        });
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
      setShowEditColumn(!showEditColumn);
      handleClose();
    }, 250);
  };

  return (
    <div className={`dc ${modalAnimation} ${isDarkTheme ? 'isDarkTheme' : 'isLightTheme'}`}>
      <section className={`dc__container ${containerAnimation}`} ref={ref}>
        <h2 className="dc__action">Delete this column ?</h2>
        <p className="dc__text">
          Are you sure you want to delete the
          ‘{currentColumnData.name}’
          column and its tasks ? This action cannot be reversed.
        </p>
        <div className="dc__button-group">
          <button
            type="button"
            className="dc__button dc__button--delete"
            onClick={handleDeleteColumn}
          >
            Delete
          </button>
          <button type="button" className="dc__button dc__button--cancel" onClick={handleCancel}>Cancel</button>
        </div>
      </section>
    </div>
  );
};

export default ModalDeleteColumn;
