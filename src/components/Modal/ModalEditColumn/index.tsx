import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { CirclePicker, ColorResult } from 'react-color';
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
  const themeContext = useContext(ThemeContext);
  const boardContext = useContext(BoardContext);
  const modalContext = useContext(ModalContext);
  const [selectedColor, setSelectedColor] = useState<string>('#f44336');

  const colors: string[] = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#607d8b', '#e4dfda', '#476c9b', '#468C98'];

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
      alert('Veuillez donner un nom');
      return;
    }
    if (!editingColumn.color) {
      alert('Veuillez choisir une couleur');
      return;
    }
    if (editingColumn._id && editingColumn && currentBoardData._id) {
      const updatedColumn = await editColumn(currentBoardData._id, editingColumn);
      if (updatedColumn) {
        setAllBoardsData((prev) => {
          const newBoards = [...prev];
          const boardIndex = newBoards.findIndex((board) => board._id === currentBoardData._id);
          const columnIndex = newBoards[boardIndex].columns.findIndex((column) => column._id === currentColumnData._id);
          newBoards[boardIndex].columns[columnIndex] = editingColumn;
          console.log('🚀 ~ file: index.tsx:60 ~ newBoards:', newBoards);
          return newBoards;
        });
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
            className="ec__button ec__button--create"
            onClick={handleEditColumn}
          >
            Edit Column
          </button>
          <button
            type="button"
            className="ec__button ec__button--delete"
            onClick={handleShowDeleteColumn}
          >
            Delete Column
          </button>
        </div>
      </section>
    </div>
  );
};

export default ModalEditColumn;
