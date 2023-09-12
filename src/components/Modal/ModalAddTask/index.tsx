import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import './styles.scss';
import { CirclePicker, ColorResult } from 'react-color';
import { toast } from 'react-toastify';
import { IconCross } from '../../../assets';
import { ThemeContext } from '../../../utils/providers/useThemeProvider';
import { Task, Subtask } from '../../../utils/Types/BoardTypes';
import { BoardContext } from '../../../utils/providers/useBoardProvider';
import { createNewTask } from '../../../utils/api/tasksAPI';

interface ModalAddTaskProps {
    handleClose: () => void;
    isOpen: boolean;
}

const ModalAddTask: React.FC<ModalAddTaskProps> = ({ handleClose, isOpen }) => {
  const ulRef = useRef<HTMLUListElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const colors: string[] = [
    '#70E4B0', '#B3E57C', '#85E083', '#6CD474', '#58C666',
    '#72C5F0', '#82D4E8', '#6CC5F7', '#59BCE5', '#47B0D3',
    '#FF6B85', '#FF887A', '#FF7373', '#FF8DA1', '#FF9B7B',
    '#FFEA61', '#FFED85', '#FFE66D', '#FFDF56', '#FFD43F',
    '#FFC285',
  ];

  const [isPickerVisible, setPickerVisibility] = useState(false);
  const [containerAnimation, setContainerAnimation] = useState('pop-in');
  const [modalAnimation, setModalAnimation] = useState('modal-open');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const boardContext = useContext(BoardContext);

  if (!boardContext) {
    throw new Error('Task must be used within a themeProvider');
  }

  const {
    currentBoardData, currentColumnData, setCurrentColumnData,
  } = boardContext;

  const initialTask: Task = {
    title: '',
    description: '',
    color: '',
    status: currentColumnData.name || '',
    subtasks: [],
  };

  const [inCreationtask, setInCreationTask] = useState<Task>(initialTask);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInCreationTask((prev) => ({ ...prev!, title: e.target.value }));
  };

  const handleColorSet = (color: ColorResult) => {
    setSelectedColor(color.hex);
    setInCreationTask((prev) => ({ ...prev!, color: color.hex }));
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInCreationTask((prev) => ({ ...prev!, description: e.target.value }));
  };

  const handleSubtaskChange = (index: number, value: string) => {
    const newSubtasks = [...inCreationtask!.subtasks];
    newSubtasks[index].title = value;
    setInCreationTask((prev) => ({ ...prev!, subtasks: newSubtasks }));
  };

  const handleAddSubtask = () => {
    const newSubtask: Subtask = {
      title: '',
      isCompleted: false,
    };
    setInCreationTask((prev) => ({
      ...prev!,
      subtasks: [...prev!.subtasks, newSubtask],
    }));
  };

  const handleDeleteSubtask = (indexToDelete: number) => {
    setInCreationTask((prev) => ({
      ...prev!,
      subtasks: prev!.subtasks.filter((_, index) => index !== indexToDelete),
    }));
  };

  useEffect(() => {
    if (ulRef.current) {
      ulRef.current.scrollTop = ulRef.current.scrollHeight;
    }
  }, [inCreationtask?.subtasks]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStatusId = e.target.value;
    const selectedStatus = currentBoardData.columns.find((column) => column._id === selectedStatusId)?.name;

    setCurrentColumnData(currentBoardData.columns.find((column) => column._id === selectedStatusId)!);

    setInCreationTask((prev) => ({
      ...prev!,
      status: selectedStatus?.toString() || '',
    }));
  };

  const themeContext = useContext(ThemeContext);

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

  const handleCreateTask = async () => {
    if (!inCreationtask.title) {
      toast.error('You must add a title', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      return;
    }
    if (currentBoardData._id && currentColumnData._id) {
      const newTask = await createNewTask(currentBoardData._id, currentColumnData._id, inCreationtask);

      if (newTask) {
        setCurrentColumnData((prev) => {
          const newColumn = { ...prev };
          newColumn.tasks.push(newTask);
          return newColumn;
        });
      }
      setContainerAnimation('pop-out');
      setModalAnimation('modal-closed');
      setTimeout(handleClose, 300);
    }
    else {
      return null;
    }
  };

  return (
    <div className={`at ${modalAnimation} ${isDarkTheme ? 'isDarkTheme' : 'isLightTheme'}`}>
      <section className={`at__container ${containerAnimation}`} ref={ref}>
        <div className="at__action-group">
          <h2 className="at__action">Add New Task</h2>
          <span
            className="at__color"
            onClick={() => setPickerVisibility(!isPickerVisible)}
            style={{
              background: inCreationtask.color ? inCreationtask.color : selectedColor,
              border: inCreationtask.color ? 'none' : '3px solid #635FC7',
            }}
          />

          <div className={`at__color-picker ${isPickerVisible ? 'at__color-picker--visible' : ''}`}>
            <CirclePicker
              color={inCreationtask.color ? inCreationtask.color : selectedColor}
              width="295"
              circleSize={30}
              colors={colors}
              onChangeComplete={handleColorSet}
            />
          </div>
        </div>
        <div className="at__title-group">
          <h3 className="at__title">Title</h3>
          <label htmlFor="at__title" className="visuallyhidden">Enter the title of the task</label>
          <input
            type="text"
            name="at__title"
            id="at__title"
            className="at__input at__input--title"
            placeholder="e.g. Take coffee break"
            value={inCreationtask?.title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="at__description-group">
          <h3 className="at__title">Description</h3>
          <label htmlFor="at__description" className="visuallyhidden">Enter the description of the task</label>
          <textarea
            name="at__description"
            id="at__description"
            className="at__input at__input--description"
            placeholder="e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little."
            value={inCreationtask?.description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="at__subtasks-group">
          <h3 className="at__title">Subtasks</h3>
          <ul className="at__subtasks" ref={ulRef}>
            {inCreationtask?.subtasks.map((subtask, key) => (
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
                  className="at__subtask-delete"
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
        <div className="at__status-group">
          <h3 className="at__title">Status</h3>
          <label htmlFor="subtasks" className="visuallyhidden">Select status of the task</label>
          <select
            className="et__select"
            id="subtasks"
            onChange={handleStatusChange}
            value={inCreationtask.status}
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
        <button
          type="button"
          className="at__button at__button--create"
          onClick={handleCreateTask}
        >
          Create Task
        </button>
      </section>
    </div>
  );
};

export default ModalAddTask;
