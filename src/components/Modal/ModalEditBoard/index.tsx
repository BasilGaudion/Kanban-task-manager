import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import './styles.scss';
import { IconCross } from '../../../assets';
import { ThemeContext } from '../../../utils/providers/useThemeProvider';
import { BoardContext } from '../../../utils/providers/useBoardProvider';
import { Board, Column } from '../../../utils/Types/BoardTypes';
import { updateBoard } from '../../../utils/api/boardsAPI';

interface ModalEditBoardProps {
    handleClose: () => void;
    isOpen: boolean;
}

const ModalEditBoard: React.FC<ModalEditBoardProps> = ({ handleClose, isOpen }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [containerAnimation, setContainerAnimation] = useState('pop-in');
  const [modalAnimation, setModalAnimation] = useState('modal-open');

  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('Task must be used within a themeProvider');
  }

  const { isDarkTheme } = themeContext;

  const boardContext = useContext(BoardContext);
  if (!boardContext) {
    throw new Error('Task must be used within a themeProvider');
  }
  const { currentBoardData, setCurrentBoardData, setAllBoardsData } = boardContext;

  const [editingBoard, setEditingBoard] = useState<Board | null>(currentBoardData);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingBoard((prev) => ({ ...prev!, name: e.target.value }));
  };

  const handleColumnChange = (index: number, value: string) => {
    const newColumns = [...editingBoard!.columns];
    newColumns[index].name = value;
    setEditingBoard((prev) => ({ ...prev!, columns: newColumns }));
  };

  const handleAddColumn = () => {
    const newColumn: Column = {
      name: '',
      color: '#FFFFFF',
      tasks: [],
    };
    setEditingBoard((prev) => ({
      ...prev!,
      columns: [...prev!.columns, newColumn],
    }));
  };

  const handleDeleteColumn = (indexToDelete: number) => {
    setEditingBoard((prev) => ({
      ...prev!,
      columns: prev!.columns.filter((_, index) => index !== indexToDelete),
    }));
  };

  const handleEditBoard = async () => {
    if (editingBoard && editingBoard._id) {
      const updatedBoard = await updateBoard(editingBoard._id, editingBoard);
      if (updatedBoard) {
        setCurrentBoardData(editingBoard);
        setAllBoardsData((prev) => prev.map((board) => {
          if (board._id === editingBoard._id) {
            return editingBoard;
          }
          return board;
        }));
      }
      setContainerAnimation('pop-out');
      setModalAnimation('modal-closed');
    }
    setTimeout(() => {
      handleClose();
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

  return (
    <div className={`eb ${modalAnimation} ${isDarkTheme ? 'isDarkTheme' : 'isLightTheme'}`}>
      <section className={`eb__container ${containerAnimation}`} ref={ref}>
        <h2 className="eb__action">Edit Board</h2>
        <div className="eb__title-group">
          <h3 className="eb__title">Board Name</h3>
          <label htmlFor="eb__title" className="visuallyhidden">Enter the title of the Board</label>
          <input
            type="text"
            name="eb__title"
            id="eb__title"
            className="eb__input eb__input--title"
            placeholder="e.g. Web Design"
            value={editingBoard?.name}
            onChange={handleNameChange}
          />
        </div>
        <div className="eb__columns-group">
          <h3 className="eb__title">Board Columns</h3>
          <ul className="eb__columns">
            {editingBoard?.columns.map((column, key) => (
              <li className="eb__column">
                <label htmlFor="eb__column1" className="visuallyhidden">Enter the first subtask</label>
                <input
                  type="text"
                  name={column.name}
                  id={column.name}
                  className="eb__input et__input--column"
                  placeholder="e.g. Make coffee"
                  value={column.name}
                  onChange={(e) => handleColumnChange(key, e.target.value)}
                />
                <img src={IconCross} alt="" className="eb__column-delete" onClick={() => handleDeleteColumn(key)} />
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="eb__button eb__button--add"
            onClick={handleAddColumn}
          >
            + Add New column
          </button>
        </div>
        <button
          type="button"
          className="eb__button eb__button--create"
          onClick={handleEditBoard}
        >
          Edit Board
        </button>
      </section>
    </div>
  );
};

export default ModalEditBoard;
