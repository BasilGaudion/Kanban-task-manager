import React, { useContext, useEffect, useRef, useState } from 'react';
import './styles.scss';
import { ThemeContext } from "../../../utils/providers/useThemeProvider";
import { BoardContext } from "../../../utils/providers/useBoardProvider";

import Task from '../../Task';


interface ModalDeleteBoardProps {
    handleClose: () => void;
    isOpen: boolean;
}

const ModalDeleteBoard: React.FC<ModalDeleteBoardProps> = ({handleClose, isOpen }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [containerAnimation, setContainerAnimation] = useState('pop-in');
    const [modalAnimation, setModalAnimation] = useState
    ('modal-open');
    const themeContext = useContext(ThemeContext);
    const boardContext = useContext(BoardContext);

    if (!boardContext) {
      throw new Error("Task must be used within a themeProvider");
    }
  
    const {currentBoardData, deleteBoard} = boardContext;

    if (!themeContext) {
      throw new Error("Task must be used within a themeProvider");
    }
  
    const {isDarkTheme} = themeContext;

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

    const handleDeleteTask = () => {
        if (currentBoardData) {
            deleteBoard(currentBoardData)
            setContainerAnimation('pop-out');
            setModalAnimation('modal-closed');
            setTimeout(handleClose, 300);
        }
    }

    const handleCancel = () => {
        setContainerAnimation('pop-out');
        setModalAnimation('modal-closed');
        setTimeout(() => {
        handleClose();
        }, 250);
    }

  return (
    <div className={`db ${modalAnimation} ${isDarkTheme ? 'isDarkTheme' : 'isLightTheme'}`}>
        <section className={`db__container ${containerAnimation}`} ref={ref}>
            <h2 className='db__action'>Delete this task ?</h2>
            <p className='db__text'>Are you sure you want to delete the ‘{currentBoardData.name}’ task and its subtasks? This action cannot be reversed.</p>
            <div className='db__button-group'>
                <button type='button' className='db__button db__button--delete' onClick={handleDeleteTask}>Delete</button>
                <button type='button' className='db__button db__button--cancel' onClick={handleCancel}>Cancel</button>
            </div>
      </section>
    </div>
  );
};

export default ModalDeleteBoard;