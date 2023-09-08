import React, {
  useEffect, useRef, useState, useContext,
} from 'react';
import './styles.scss';
import { CirclePicker, ColorResult } from 'react-color';
import { IconCross } from '../../../assets';
import { ModalContext } from '../../../utils/providers/useModalProvider';
import { ThemeContext } from '../../../utils/providers/useThemeProvider';
import { BoardContext } from '../../../utils/providers/useBoardProvider';
import { Column, Subtask, Task } from '../../../utils/Types/BoardTypes';
import { createNewTask, deleteTask, editTask } from '../../../utils/api/tasksAPI';

interface ModalEditTaskProps {
    handleClose: () => void;
    isOpen: boolean;
}

const ModalEditTask: React.FC<ModalEditTaskProps> = ({ handleClose, isOpen }) => {
  const ref = useRef<HTMLDivElement>(null);
  const colors: string[] = [
    '#70E4B0', '#B3E57C', '#85E083', '#6CD474', '#58C666', // Verts pastel vifs
    '#72C5F0', '#82D4E8', '#6CC5F7', '#59BCE5', '#47B0D3', // Bleus pastel vifs
    '#FF6B85', '#FF887A', '#FF7373', '#FF8DA1', '#FF9B7B', // Rouges pastel vifs
    '#FFEA61', '#FFED85', '#FFE66D', '#FFDF56', '#FFD43F', // Jaunes pastel vifs
    '#FFC285', // Orange pastel vif
  ];
  const [isPickerVisible, setPickerVisibility] = useState(false);
  const [containerAnimation, setContainerAnimation] = useState('pop-in');
  const [modalAnimation, setModalAnimation] = useState('modal-open');
  const modalContext = useContext(ModalContext);
  const boardContext = useContext(BoardContext);

  if (!boardContext) {
    throw new Error('Task must be used within a themeProvider');
  }

  const {
    currentTaskData, currentColumnData, currentBoardData, setCurrentBoardData, setCurrentColumnData, setAllBoardsData, setCurrentTaskData,
  } = boardContext;
  const [editingTask, setEditingTask] = useState<Task>(currentTaskData);
  const [selectedColor, setSelectedColor] = useState<string>(editingTask?.color || '');

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

  const handleEditTask = async () => {
    if (!editingTask.title) {
      alert('Veuillez donner un nom');
      return;
    }
    if (!editingTask.description) {
      alert('Veuillez donner une description');
      return;
    }
    if (!editingTask.status) {
      alert('Veuillez choisir un status');
      return;
    }
    if (editingTask._id && editingTask && currentBoardData._id && currentColumnData._id) {
      const updatedBoard = await editTask(currentBoardData._id, currentColumnData._id, editingTask);
      if (!updatedBoard) return;
      console.log(updatedBoard);

      setAllBoardsData((prev) => {
        const newBoards = [...prev];
        const boardIndex = newBoards.findIndex((board) => board._id === currentBoardData._id);
        const columnIndex = newBoards[boardIndex].columns.findIndex((column) => column._id === currentColumnData._id);
        const taskIndex = newBoards[boardIndex].columns[columnIndex].tasks.findIndex((task) => task._id === currentTaskData._id);

        const updatedTaskFromBoard = updatedBoard.columns[columnIndex].tasks[taskIndex];
        newBoards[boardIndex].columns[columnIndex].tasks[taskIndex] = updatedTaskFromBoard;

        return newBoards;
      });
      setCurrentTaskData(updatedBoard.columns.find((column: Column) => column.tasks.some((taskInColumn) => taskInColumn._id === currentTaskData._id))!.tasks.find((task: Task) => task._id === currentTaskData._id)!);
    }
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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingTask((prev) => ({ ...prev!, title: e.target.value }));
  };

  const handleColorSet = (color: ColorResult) => {
    setSelectedColor(color.hex);
    setEditingTask((prev) => ({ ...prev!, color: color.hex }));
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditingTask((prev) => ({ ...prev!, description: e.target.value }));
  };

  const handleSubtaskChange = (index: number, value: string) => {
    const newSubtasks = [...editingTask!.subtasks];
    newSubtasks[index].title = value;
    setEditingTask((prev) => ({ ...prev!, subtasks: newSubtasks }));
  };

  const handleAddSubtask = () => {
    const newSubtask: Subtask = {
      title: '',
      isCompleted: false,
    };
    setEditingTask((prev) => ({
      ...prev!,
      subtasks: [...prev!.subtasks, newSubtask],
    }));
  };

  const handleDeleteSubtask = (indexToDelete: number) => {
    setEditingTask((prev) => ({
      ...prev!,
      subtasks: prev!.subtasks.filter((_, index) => index !== indexToDelete),
    }));
  };

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newColumnId = e.target.value;
    const newColumn = currentBoardData.columns.find((column) => column._id === newColumnId);

    if (currentBoardData._id && currentColumnData._id && editingTask?._id) {
      await deleteTask(currentBoardData._id, currentColumnData._id, editingTask._id);
    }

    if (currentBoardData._id && editingTask) {
      await createNewTask(currentBoardData._id, newColumnId, editingTask);
    }

    setCurrentColumnData(newColumn!);
    setCurrentBoardData((prev) => {
      const sourceColumn = prev.columns.find((column) => column._id === currentColumnData._id);
      if (sourceColumn) {
        sourceColumn.tasks = sourceColumn.tasks.filter((task) => task._id !== editingTask?._id);
      }

      const targetColumn = prev.columns.find((column) => column._id === newColumnId);
      if (targetColumn && editingTask) {
        targetColumn.tasks.push(editingTask);
      }

      return { ...prev };
    });

    setEditingTask((prev) => ({
      ...prev,
      status: newColumn?.name || '',
    }));
  };

  return (
    <div className={`et ${modalAnimation} ${isDarkTheme ? 'isDarkTheme' : 'isLightTheme'}`}>
      <section className={`et__container ${containerAnimation}`} ref={ref}>
        <div className="et__action-group">
          <h2 className="et__action">Edit Task</h2>
          <span
            className="et__color"
            onClick={() => setPickerVisibility(!isPickerVisible)}
            style={{
              background: editingTask?.color,
              border: editingTask.color ? 'none' : '3px solid #635FC7',
            }}
          />
          <div className={`et__color-picker ${isPickerVisible ? 'et__color-picker--visible' : ''}`}>
            <CirclePicker
              color={editingTask.color ? editingTask.color : selectedColor}
              width="295"
              circleSize={30}
              colors={colors}
              onChangeComplete={handleColorSet}
            />
          </div>
        </div>
        <div className="et__title-group">
          <h3 className="et__title">Title</h3>
          <label htmlFor="et__title" className="visuallyhidden">Enter the title of the task</label>
          <input
            type="text"
            name="et__title"
            id="et__title"
            className="et__input et__input--title"
            placeholder="e.g. Take coffee break"
            value={editingTask?.title}
            onChange={handleTitleChange}
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
            value={editingTask?.description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="et__subtasks-group">
          <h3 className="et__title">Subtasks</h3>
          <ul className="et__subtasks">
            {editingTask?.subtasks.map((subtask, key) => (
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
            ))}
          </ul>
          <button
            type="button"
            className="et__button et__button--add"
            onClick={handleAddSubtask}
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
            onChange={handleStatusChange}
            value={editingTask?.status}
          >
            <option
              value={currentColumnData._id}
              selected
            >
              {currentColumnData.name}
            </option>
            {currentBoardData.columns
              .filter((column) => column._id !== currentColumnData._id)
              .map((column, key) => (
                <option key={key} value={column._id}>{column.name}</option>
              ))}
          </select>
        </div>
        <button type="button" className="et__button et__button--create" onClick={handleEditTask}>Edit Task</button>
      </section>
    </div>
  );
};

export default ModalEditTask;
