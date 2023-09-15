import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import './styles.scss';
import { ThemeContext } from '../../../utils/providers/useThemeProvider';
import { BoardContext } from '../../../utils/providers/useBoardProvider';
import { ModalContext } from '../../../utils/providers/useModalProvider';
import { deleteTask } from '../../../utils/api/tasksAPI';

// import Task from '../../Task';

interface ModalDeleteTaskProps {
    handleClose: () => void;
    isOpen: boolean;
}

const ModalDeleteTask: React.FC<ModalDeleteTaskProps> = ({ handleClose, isOpen }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [containerAnimation, setContainerAnimation] = useState('pop-in');
  const [modalAnimation, setModalAnimation] = useState('modal-open');
  const [isLoading, setIsLoading] = useState(false);
  const themeContext = useContext(ThemeContext);
  const boardContext = useContext(BoardContext);
  const modalContext = useContext(ModalContext);

  if (!boardContext) {
    throw new Error('Task must be used within a themeProvider');
  }

  const {
    currentTaskData, currentColumnData, currentBoardData, setAllBoardsData,
  } = boardContext;

  if (!modalContext) {
    throw new Error('Task must be used within a ModalProvider');
  }

  const { showViewTask, setShowViewTask } = modalContext;

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

  const handleDeleteTask = async () => {
    if (currentTaskData._id && currentColumnData._id && currentBoardData._id) {
      setIsLoading(true);
      const deletedTask = await deleteTask(currentBoardData._id, currentColumnData._id, currentTaskData._id);

      if (deletedTask) {
        setAllBoardsData((prev) => {
          const newBoards = [...prev];

          const boardIndex = newBoards.findIndex((board) => board._id === currentBoardData._id);

          const columnIndex = newBoards[boardIndex].columns.findIndex((column) => column._id === currentColumnData._id);

          newBoards[boardIndex].columns[columnIndex].tasks = newBoards[boardIndex].columns[columnIndex].tasks.filter((task) => task._id !== currentTaskData._id);

          return newBoards;
        });
        setIsLoading(false);
        setContainerAnimation('pop-out');
        setModalAnimation('modal-closed');
        setTimeout(handleClose, 300);
      }
      else {
        setIsLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setContainerAnimation('pop-out');
    setModalAnimation('modal-closed');
    setTimeout(() => {
      setShowViewTask(!showViewTask);
      handleClose();
    }, 250);
  };

  return (
    <div className={`dt ${modalAnimation} ${isDarkTheme ? 'isDarkTheme' : 'isLightTheme'}`}>
      <section className={`dt__container ${containerAnimation}`} ref={ref}>
        <h2 className="dt__action">Delete this task ?</h2>
        <p className="dt__text">
          Are you sure you want to delete the
          ‘{currentTaskData?.title}’
          task and its subtasks? This action cannot be reversed.
        </p>
        <div className="dt__button-group">
          <button
            type="button"
            className="dt__button dt__button--delete"
            onClick={handleDeleteTask}
            disabled={isLoading}
          >Delete
          </button>
          <button
            type="button"
            className="dt__button dt__button--cancel"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </section>
    </div>
  );
};

export default ModalDeleteTask;
