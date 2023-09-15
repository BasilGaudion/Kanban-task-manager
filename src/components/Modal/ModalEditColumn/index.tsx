import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { CirclePicker, ColorResult } from 'react-color';
import { toast } from 'react-toastify';
import { ThemeContext } from '../../../utils/providers/useThemeProvider';
import { BoardContext } from '../../../utils/providers/useBoardProvider';
import './styles.scss';
import { Column } from '../../../utils/Types/BoardTypes';
import { editColumn } from '../../../utils/api/columnsAPI';
import { ModalContext } from '../../../utils/providers/useModalProvider';

interface ModalEditColumnProps {
    handleClose: () => void;
    isOpen: boolean;
}

const ModalEditColumn: React.FC<ModalEditColumnProps> = ({ handleClose, isOpen }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [containerAnimation, setContainerAnimation] = useState('pop-in');
  const [modalAnimation, setModalAnimation] = useState('modal-open');
  const [isLoading, setIsLoading] = useState(false);
  const themeContext = useContext(ThemeContext);
  const boardContext = useContext(BoardContext);
  const modalContext = useContext(ModalContext);
  const [selectedColor, setSelectedColor] = useState<string>('#f44336');

  const colors: string[] = [
    '#70E4B0', '#B3E57C', '#85E083', '#6CD474', '#58C666',
    '#72C5F0', '#82D4E8', '#6CC5F7', '#59BCE5', '#47B0D3',
    '#FF6B85', '#FF887A', '#FF7373', '#FF8DA1', '#FF9B7B',
    '#FFEA61', '#FFED85', '#FFE66D', '#FFDF56', '#FFD43F',
    '#FFC285',
  ];

  if (!modalContext) {
    throw new Error('Task must be used within a ModalProvider');
  }

  const {
    showDeleteColumn, setShowDeleteColumn,
  } = modalContext;

  if (!boardContext) {
    throw new Error('Task must be used within a themeProvider');
  }

  const {
    setAllBoardsData, currentBoardData, currentColumnData,
  } = boardContext;

  const [editingColumn, setEditingColumn] = useState<Column>(currentColumnData);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingColumn((prev) => ({ ...prev!, name: e.target.value }));
  };

  const handleColorSet = (color: ColorResult) => {
    setSelectedColor(color.hex);
    setEditingColumn((prev) => ({ ...prev!, color: color.hex }));
  };

  const handleEditColumn = async () => {
    if (!editingColumn.name) {
      toast.error('You must define a name', {
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
    if (!editingColumn.color) {
      toast.error('You need to define a color', {
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
    if (editingColumn._id && editingColumn && currentBoardData._id) {
      setIsLoading(true);
      const updatedColumn = await editColumn(currentBoardData._id, editingColumn);
      if (updatedColumn) {
        setAllBoardsData((prev) => {
          const newBoards = [...prev];
          const boardIndex = newBoards.findIndex((board) => board._id === currentBoardData._id);
          const columnIndex = newBoards[boardIndex].columns.findIndex((column) => column._id === currentColumnData._id);
          newBoards[boardIndex].columns[columnIndex] = editingColumn;
          return newBoards;
        });
        setIsLoading(false);
      }
      else {
        setIsLoading(false);
      }
      setContainerAnimation('pop-out');
      setModalAnimation('modal-closed');
      setTimeout(handleClose, 300);
    }
  };

  const handleShowDeleteColumn = () => {
    setContainerAnimation('pop-out');
    setModalAnimation('modal-closed');
    setTimeout(() => {
      setShowDeleteColumn(!showDeleteColumn);
      handleClose();
    }, 250);
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

  if (!themeContext) {
    throw new Error('Task must be used within a themeProvider');
  }

  const { isDarkTheme } = themeContext;

  return (
    <div className={`ec ${modalAnimation} ${isDarkTheme ? 'isDarkTheme' : 'isLightTheme'}`}>
      <section className={`ec__container ${containerAnimation}`} ref={ref}>
        <h2 className="ec__action">Edit Column</h2>
        <div className="ec__title-group">
          <h3 className="ec__title">Title</h3>
          <label htmlFor="ec__title" className="visuallyhidden">Enter the title of the task</label>
          <input
            type="text"
            name="ec__title"
            id="ec__title"
            className="ec__input ec__input--title"
            placeholder="Todo"
            value={editingColumn?.name}
            onChange={handleNameChange}
          />
        </div>
        <div className="ec__color-picker">
          <h3 className="ec__title">Color</h3>
          <div className="ec__color-container">
            <CirclePicker
              color={editingColumn?.color}
              width="295"
              circleSize={30}
              colors={colors}
              onChangeComplete={handleColorSet}
            />
          </div>

        </div>
        <div className="ec__buttons-group">
          <button
            type="button"
            className="ec__button ec__button--delete"
            onClick={handleShowDeleteColumn}
          >
            Delete Column
          </button>
          <button
            type="button"
            className="ec__button ec__button--create"
            onClick={handleEditColumn}
            disabled={isLoading}
          >
            Edit Column
          </button>
        </div>
      </section>
    </div>
  );
};

export default ModalEditColumn;
