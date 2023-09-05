import React, {
  useEffect, useRef, useState, useContext,
} from 'react';
import './styles.scss';
// import { v4 as uuidv4 } from 'uuid';
import { IconCross } from '../../../assets';
import { ModalContext } from '../../../utils/providers/useModalProvider';
import { ThemeContext } from '../../../utils/providers/useThemeProvider';
// import { BoardContext, Subtask, Task } from '../../../utils/providers/useBoardProvider';

interface ModalEditTaskProps {
    handleClose: () => void;
    isOpen: boolean;
}

const ModalEditTask: React.FC<ModalEditTaskProps> = ({ handleClose, isOpen }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [containerAnimation, setContainerAnimation] = useState('pop-in');
  const [modalAnimation, setModalAnimation] = useState('modal-open');
  const modalContext = useContext(ModalContext);
  //   const boardContext = useContext(BoardContext);

  //   if (!boardContext) {
  //     throw new Error('Task must be used within a themeProvider');
  //   }

  //   const {
  //     currentTask, setCurrentTask, currentBoardData, updateTask,
  //   } = boardContext;
  //   const [editingTask, setEditingTask] = useState<Task | null>(currentTask);

  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('Task must be used within a themeProvider');
  }

  const { isDarkTheme } = themeContext;

  if (!modalContext) {
    throw new Error('Task must be used within a ModalProvider');
  }

  const {
    showViewTask, setShowViewTask, showEditTask, setShowEditTask,
  } = modalContext;

  const handleEditTask = () => {
    // if (editingTask && currentTask) {
    //   updateTask(currentTask.id, editingTask);
    // }
    setContainerAnimation('pop-out');
    setModalAnimation('modal-closed');
    setTimeout(() => {
      handleClose();
      setShowEditTask(!showEditTask);
      setShowViewTask(!showViewTask);
    }, 300);
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

  //   const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setEditingTask((prev) => ({ ...prev!, title: e.target.value }));
  //   };

  //   const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //     setEditingTask((prev) => ({ ...prev!, description: e.target.value }));
  //   };

  //   const handleSubtaskChange = (index: number, value: string) => {
  //     const newSubtasks = [...editingTask!.subtasks];
  //     newSubtasks[index].title = value;
  //     setEditingTask((prev) => ({ ...prev!, subtasks: newSubtasks }));
  //   };

  //   const handleAddSubtask = () => {
  //     const newSubtask: Subtask = {
  //       id: uuidv4(),
  //       title: '',
  //       isCompleted: false,
  //     };
  //     setEditingTask((prev) => ({
  //       ...prev!,
  //       subtasks: [...prev!.subtasks, newSubtask],
  //     }));
  //   };

  //   const handleDeleteSubtask = (indexToDelete: number) => {
  //     setEditingTask((prev) => ({
  //       ...prev!,
  //       subtasks: prev!.subtasks.filter((_, index) => index !== indexToDelete),
  //     }));
  //   };

  //   const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //     const selectedStatus = e.target.value;

  //     setEditingTask((prev) => ({
  //       ...prev!,
  //       status: selectedStatus,
  //     }));
  //   };

  return (
    <div className={`et ${modalAnimation} ${isDarkTheme ? 'isDarkTheme' : 'isLightTheme'}`}>
      <section className={`et__container ${containerAnimation}`} ref={ref}>
        <h2 className="et__action">Edit Task</h2>
        <div className="et__title-group">
          <h3 className="et__title">Title</h3>
          <label htmlFor="et__title" className="visuallyhidden">Enter the title of the task</label>
          <input
            type="text"
            name="et__title"
            id="et__title"
            className="et__input et__input--title"
            placeholder="e.g. Take coffee break"
            // value={editingTask?.title}
            // onChange={handleTitleChange}
          />
        </div>
        <div className="et__description-group">
          <h3 className="et__title">Description</h3>
          <label htmlFor="et__description" className="visuallyhidden">Enter the description of the task</label>
          <textarea
            name="et__description"
            id="et__description"
            className="et__input et__input--description"
            placeholder="e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little."
            // value={editingTask?.description}
            // onChange={handleDescriptionChange}
          />
        </div>
        <div className="et__subtasks-group">
          <h3 className="et__title">Subtasks</h3>
          <ul className="et__subtasks">
            {/* {editingTask?.subtasks.map((subtask, key) => (
              <li className="et__subtask">
                <label htmlFor="et__subtask1" className="visuallyhidden">Enter the first subtask</label>
                <input
                  type="text"
                  name={subtask.title}
                  id={subtask.title}
                  className="et__input et__input--subtask"
                  placeholder="e.g. Make coffee"
                  value={subtask.title}
                  onChange={(e) => handleSubtaskChange(key, e.target.value)}
                />
                <img
                  src={IconCross}
                  alt="Delete Subtask"
                  className="et__subtask-delete"
                  onClick={() => handleDeleteSubtask(key)}
                />
              </li>
            ))} */}
          </ul>
          <button
            type="button"
            className="et__button et__button--add"
            // onClick={handleAddSubtask}
          >
            + Add New Subtask
          </button>
        </div>
        <div className="et__status-group">
          <h3 className="et__title">Status</h3>
          <label htmlFor="subtasks" className="visuallyhidden">Select status of the task</label>
          <select
            className="et__select"
            id="subtasks"
            // onChange={handleStatusChange}
          >
            {/* {currentBoardData.columns.map((column, key) => (
              <option value={column.name}>{column.name}</option>
            ))} */}
          </select>
        </div>
        <button type="button" className="et__button et__button--create" onClick={handleEditTask}>Edit Task</button>
      </section>
    </div>
  );
};

export default ModalEditTask;
