import React, { useContext, useEffect, useRef, useState } from 'react';
import { CirclePicker } from 'react-color';
import { ThemeContext } from "../../../utils/providers/useThemeProvider";
import { BoardContext, Column } from "../../../utils/providers/useBoardProvider";
import './styles.scss';
import { v4 as uuidv4 } from 'uuid';

interface ModalAddColumnProps {
    handleClose: () => void;
    isOpen: boolean;
}

const ModalAddColumn: React.FC<ModalAddColumnProps> = ({handleClose, isOpen }) => { 
    const ref = useRef<HTMLDivElement>(null);
    const [containerAnimation, setContainerAnimation] = useState('pop-in');
    const [modalAnimation, setModalAnimation] = useState('modal-open');
    const themeContext = useContext(ThemeContext);
    const boardContext = useContext(BoardContext);

    const colors: string[] = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b", "#e4dfda", "#476c9b", "#468C98" ]; 

    if (!boardContext) {
        throw new Error("Task must be used within a themeProvider");
    }

    const {createColumn} = boardContext;

    const initialColumn: Column = {
        id: uuidv4(),
        name: "",
        tasks: []
    };

    const [inCreationColumn, setInCreationColumn] = useState<Column>(initialColumn);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInCreationColumn(prev => ({ ...prev!, name: e.target.value }));
    }

    const handleCreateColumn = () => {
        if (!inCreationColumn.name) {
            alert("Veuillez donner un nom");
            return;
        }
        createColumn(inCreationColumn);
        setContainerAnimation('pop-out');
        setModalAnimation('modal-closed');
        setTimeout(handleClose, 300);
    }

    useEffect(() => {
        if (isOpen) {
            setContainerAnimation('pop-in');
            setModalAnimation('modal-open');
        } else {
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
        }
    
        document.addEventListener("mousedown", checkIfClickedOutside);
    
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside);
        }
    }, [handleClose]);

    if (!themeContext) {
      throw new Error("Task must be used within a themeProvider");
    }
  
    const {isDarkTheme} = themeContext;

  return (
    <div className={`ac ${modalAnimation} ${isDarkTheme ? 'isDarkTheme' : 'isLightTheme'}`}>
        <section className={`ac__container ${containerAnimation}`} ref={ref}>
            <h2 className='ac__action'>Add New Column</h2>
            <div className='ac__title-group'>
                <h3 className='ac__title'>Title</h3>
                <label htmlFor="ac__title" className="visuallyhidden">Enter the title of the task</label>
                <input
                type="text"
                name="ac__title"
                id="ac__title"
                className='ac__input ac__input--title'
                placeholder='Todo'
                value={inCreationColumn?.name}
                onChange={handleTitleChange}
                />
            </div>
            <div className='ac__color-picker'>
                <h3 className='ac__title'>Color</h3>
                <div className='ac__color-container'>
                    <CirclePicker width='295' circleSize={30} colors={colors}/>
                </div>
                
            </div>

            <button
            type='button'
            className='ac__button ac__button--create'
            onClick={handleCreateColumn}>
                Create New Column
            </button>
        </section>
    </div>
  );
};

export default ModalAddColumn;