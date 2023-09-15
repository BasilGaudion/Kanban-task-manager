import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import './styles.scss';
import { toast } from 'react-toastify';
import { IconCross } from '../../../assets';
import { ThemeContext } from '../../../utils/providers/useThemeProvider';
import { createNewBoard } from '../../../utils/api/boardsAPI';
import { Board, Column } from '../../../utils/Types/BoardTypes';
import { BoardContext } from '../../../utils/providers/useBoardProvider';

interface ModalAddBoardProps {
    handleClose: () => void;
    isOpen: boolean;
}

const ModalAddBoard: React.FC<ModalAddBoardProps> = ({ handleClose, isOpen }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [containerAnimation, setContainerAnimation] = useState('pop-in');
  const [modalAnimation, setModalAnimation] = useState('modal-open');
  const [isLoading, setIsLoading] = useState(false);
  const boardContext = useContext(BoardContext);

  if (!boardContext) {
    throw new Error('Task must be used within a asideProvider');
  }

  const { allBoardsData, setAllBoardsData, setCurrentBoardData } = boardContext;

  const initialBoard: Board = {
    name: '',
    columns: [],
  };
  const [inCreationBoard, setInCreationBoard] = useState<Board>(initialBoard);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInCreationBoard((prev) => ({ ...prev!, name: e.target.value }));
  };

  const handleColumnsChange = (index: number, value: string) => {
    const newColumns = [...inCreationBoard!.columns];
    newColumns[index].name = value;
    setInCreationBoard((prev) => ({ ...prev!, columns: newColumns }));
  };

  const handleAddColumns = () => {
    const newColumns: Column = {
      name: '',
      color: '#FFFFFF',
      tasks: [],
    };

    setInCreationBoard((prev) => ({
      ...prev!,
      columns: [...prev!.columns, newColumns],
    }));
  };

  const handleDeleteColumns = (indexToDelete: number) => {
    setInCreationBoard((prev) => ({
      ...prev!,
      columns: prev!.columns.filter((_, index) => index !== indexToDelete),
    }));
  };

  const handleCreateBoard = async () => {
    if (!inCreationBoard.name) {
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
    setIsLoading(true);
    const newBoard = await createNewBoard(inCreationBoard);
    if (newBoard) {
      setCurrentBoardData(newBoard);
      setAllBoardsData([...allBoardsData, newBoard]);
      setIsLoading(false);
    }
    else {
      setIsLoading(false);
    }
    handleClose();
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

  return (
    <div className={`ab ${modalAnimation} ${isDarkTheme ? 'isDarkTheme' : 'isLightTheme'}`}>
      <section className={`ab__container ${containerAnimation}`} ref={ref}>
        <h2 className="ab__action">Add New Board</h2>
        <div className="ab__title-group">
          <h3 className="ab__title">Board Name</h3>
          <label htmlFor="ab__title" className="visuallyhidden">Enter the title of the Board</label>
          <input
            type="text"
            name="ab__title"
            id="ab__title"
            className="ab__input ab__input--title"
            placeholder="e.g. Web Design"
            value={inCreationBoard?.name}
            onChange={handleTitleChange}
          />
        </div>
        <div className="ab__columns-group">
          <h3 className="ab__title">Board Columns</h3>
          <ul className="ab__columns">
            {inCreationBoard?.columns.map((column, key) => (
              <li className="ab__column">
                <label htmlFor="ab__column1" className="visuallyhidden">Enter the first column</label>
                <input
                  type="text"
                  name={column.name}
                  id={column.name}
                  className="ab__input ab__input--column"
                  placeholder="e.g. Make coffee"
                  value={column.name}
                  onChange={(e) => handleColumnsChange(key, e.target.value)}
                />
                <img
                  src={IconCross}
                  alt=""
                  className="ab__column-delete"
                  onClick={() => handleDeleteColumns(key)}
                />
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="ab__button ab__button--add"
            onClick={handleAddColumns}
          >
            + Add New column
          </button>
        </div>
        <button
          type="button"
          className="ab__button ab__button--create"
          onClick={handleCreateBoard}
          disabled={isLoading}
        >Create New Board
        </button>
      </section>
    </div>
  );
};

export default ModalAddBoard;
