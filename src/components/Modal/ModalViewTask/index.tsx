import React, {
  useEffect, useRef, useState, useContext,
} from 'react';
import './styles.scss';
import { IconVerticalEllipsis } from '../../../assets';
import { ModalContext } from '../../../utils/providers/useModalProvider';
import { ThemeContext } from '../../../utils/providers/useThemeProvider';
import { BoardContext } from '../../../utils/providers/useBoardProvider';
import { editTask } from '../../../utils/api/tasksAPI';

interface ModalViewTaskProps {
    handleClose: () => void;
    isOpen: boolean;
}

const ModalViewTask: React.FC<ModalViewTaskProps> = ({ handleClose, isOpen }) => {
  const ref = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLImageElement>(null);
  const [containerAnimation, setContainerAnimation] = useState('pop-in');
  const [modalAnimation, setModalAnimation] = useState('modal-open');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const modalContext = useContext(ModalContext);
  const boardContext = useContext(BoardContext);

  if (!boardContext) {
    throw new Error('Task must be used within a themeProvider');
  }

  const {
    currentTaskData, setCurrentTaskData, currentColumnData, currentBoardData, setCurrentBoardData,
  } = boardContext;

  if (!currentTaskData) return null;

  if (!modalContext) {
    throw new Error('Task must be used within a ModalProvider');
  }

  const {
    showEditTask, setShowEditTask, setShowDeleteTask, showDeleteTask,
  } = modalContext;

  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('Task must be used within a themeProvider');
  }

  const { isDarkTheme } = themeContext;

  const handleShowEditTask = () => {
    setContainerAnimation('pop-out');
    setModalAnimation('modal-closed');
    setTimeout(() => {
      setShowEditTask(!showEditTask);
      handleClose();
    }, 250);
  };

  const handleShowDeleteTask = () => {
    setContainerAnimation('pop-out');
    setModalAnimation('modal-closed');
    setTimeout(() => {
      setShowDeleteTask(!showDeleteTask);
      handleClose();
    }, 250);
  };

  const handleToggleSubtaskStatus = async (subtaskId: string) => {
    setCurrentTaskData((prev) => ({
      ...prev!,
      subtasks: prev!.subtasks.map((subtask) => {
        if (subtask._id === subtaskId) {
          return {
            ...subtask,
            isCompleted: !subtask.isCompleted,
          };
        }
        return subtask;
      }),
    }));
    console.log('currentTaskData', currentTaskData);
    
    editTask(currentBoardData._id!, currentColumnData._id!, currentTaskData);
  };

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

  const completedSubtasks = currentTaskData.subtasks.filter((subtask) => subtask.isCompleted).length;

  return (

    <div className={`vt ${modalAnimation} ${isDarkTheme ? 'isDarkTheme' : 'isLightTheme'}`}>
      <section className={`vt__container ${containerAnimation}`} ref={ref}>
        <div className="vt__title-group">
          <h2 className="vt__title">{currentTaskData?.title}</h2>
          <div className="vt__settings" onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
            <img ref={iconRef} src={IconVerticalEllipsis} className="vt__ellipsis" alt="" />
          </div>
          <div className={`vt__options ${isSettingsOpen ? '' : 'disable'}`} ref={settingsRef}>
            <p className="vt__option" onClick={handleShowEditTask}>Edit Task</p>
            <p className="vt__option vt__option--delete" onClick={handleShowDeleteTask}>Delete Task</p>
          </div>
        </div>
        <p className="vt__text">{currentTaskData?.description}</p>
        <h4 className="vt__subtitle">Subtasks ({completedSubtasks} of {currentTaskData?.subtasks.length})</h4>
        <ul className="vt__checkgroup">
          {currentTaskData?.subtasks.map((subtask, key) => (
            <li className="vt__check-item" key={key}>
              <input
                type="checkbox"
                name={subtask.title}
                id={subtask.title}
                className="vt__checkbox"
                checked={subtask.isCompleted}
                onChange={() => handleToggleSubtaskStatus(subtask._id ? subtask._id : '')}
              />
              <label htmlFor={subtask.title}>{subtask.title}</label>
            </li>
          ))}
        </ul>
        <h4 className="vt__subtitle">Current status</h4>
        <div className="vt__select-block">
          <label htmlFor="subtasks" className="visuallyhidden">Select status</label>
          <select className="vt__select" id="subtasks">
            {/* {currentBoardData.columns.map((column, key) => (
              <option value={key}>{column.name}</option>
            ))} */}
          </select>
        </div>
      </section>
    </div>
  );
};

export default ModalViewTask;
