import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { CirclePicker, ColorResult } from 'react-color';
import { toast } from 'react-toastify';
import { ThemeContext } from '../../../utils/providers/useThemeProvider';
import { BoardContext } from '../../../utils/providers/useBoardProvider';
import './styles.scss';
import { Column } from '../../../utils/Types/BoardTypes';
import { createNewColumn } from '../../../utils/api/columnsAPI';

interface ModalAddColumnProps {
    handleClose: () => void;
    isOpen: boolean;
}

const ModalAddColumn: React.FC<ModalAddColumnProps> = ({ handleClose, isOpen }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [containerAnimation, setContainerAnimation] = useState('pop-in');
  const [modalAnimation, setModalAnimation] = useState('modal-open');
  const themeContext = useContext(ThemeContext);
  const boardContext = useContext(BoardContext);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>('#f44336');

  const colors: string[] = [
    '#70E4B0', '#B3E57C', '#85E083', '#6CD474', '#58C666',
    '#72C5F0', '#82D4E8', '#6CC5F7', '#59BCE5', '#47B0D3',
    '#FF6B85', '#FF887A', '#FF7373', '#FF8DA1', '#FF9B7B',
    '#FFEA61', '#FFED85', '#FFE66D', '#FFDF56', '#FFD43F',
    '#FFC285',
  ];

  if (!boardContext) {
    throw new Error('Task must be used within a themeProvider');
  }

  const { currentBoardData, setCurrentBoardData } = boardContext;

  const initialColumn: Column = {
    name: '',
    color: '#f44336',
    tasks: [],
  };

  const [inCreationColumn, setInCreationColumn] = useState<Column>(initialColumn);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInCreationColumn((prev) => ({ ...prev!, name: e.target.value }));
  };

  const handleColorSet = (color: ColorResult) => {
    setSelectedColor(color.hex);
    setInCreationColumn((prev) => ({ ...prev!, color: color.hex }));
  };

  const handleCreateColumn = async () => {
    if (!inCreationColumn.name) {
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
    if (!inCreationColumn.color) {
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
    if (currentBoardData._id) {
      setIsLoading(true);
      const newColumn = await createNewColumn(currentBoardData._id, inCreationColumn);
      if (newColumn) {
        setCurrentBoardData((prev) => {
          const newBoard = { ...prev };
          newBoard.columns.push(newColumn);
          return newBoard;
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
    <div className={`ac ${modalAnimation} ${isDarkTheme ? 'isDarkTheme' : 'isLightTheme'}`}>
      <section className={`ac__container ${containerAnimation}`} ref={ref}>
        <h2 className="ac__action">Add New Column</h2>
        <div className="ac__title-group">
          <h3 className="ac__title">Title</h3>
          <label htmlFor="ac__title" className="visuallyhidden">Enter the title of the task</label>
          <input
            type="text"
            name="ac__title"
            id="ac__title"
            className="ac__input ac__input--title"
            placeholder="Todo"
            value={inCreationColumn?.name}
            onChange={handleTitleChange}
          />
        </div>
        <div className="ac__color-picker">
          <h3 className="ac__title">Color</h3>
          <div className="ac__color-container">
            <CirclePicker
              color={selectedColor}
              width="295"
              circleSize={30}
              colors={colors}
              onChangeComplete={handleColorSet}
            />
          </div>

        </div>

        <button
          type="button"
          className="ac__button ac__button--create"
          onClick={handleCreateColumn}
          disabled={isLoading}
        >
          Create New Column
        </button>
      </section>
    </div>
  );
};

export default ModalAddColumn;
