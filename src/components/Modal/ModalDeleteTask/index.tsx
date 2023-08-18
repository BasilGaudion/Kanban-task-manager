import React, { useContext, useEffect, useRef, useState } from 'react';
import './styles.scss';
import { ThemeContext } from "../../../utils/providers/useThemeProvider";
import { BoardContext } from "../../../utils/providers/useBoardProvider";
import { ModalContext } from "../../../utils/providers/useModalProvider";

import Task from '../../Task';


interface ModalAddTaskProps {
    handleClose: () => void;
    isOpen: boolean;
}

const ModalDeleteTask: React.FC<ModalAddTaskProps> = ({handleClose, isOpen }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [containerAnimation, setContainerAnimation] = useState('pop-in');
    const [modalAnimation, setModalAnimation] = useState
    ('modal-open');
    const themeContext = useContext(ThemeContext);
    const boardContext = useContext(BoardContext);
    const modalContext = useContext(ModalContext);

    if (!boardContext) {
      throw new Error("Task must be used within a themeProvider");
    }
  
    const {currentTask, deleteTask,} = boardContext;

    if (!modalContext) {
        throw new Error("Task must be used within a ModalProvider");
      }
    
      const { showViewTask, setShowViewTask } = modalContext;

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
        if (currentTask) {
            deleteTask(currentTask)
            setContainerAnimation('pop-out');
            setModalAnimation('modal-closed');
            setTimeout(handleClose, 300);
        }
    }

    const handleCancel = () => {
        setContainerAnimation('pop-out');
        setModalAnimation('modal-closed');
        setTimeout(() => {
        setShowViewTask(!showViewTask);
        handleClose();
        }, 250);
    }

  return (
    <div className={`dt ${modalAnimation} ${isDarkTheme ? 'isDarkTheme' : 'isLightTheme'}`}>
        <section className={`dt__container ${containerAnimation}`} ref={ref}>
            <h2 className='dt__action'>Delete this task ?</h2>
            <p className='dt__text'>Are you sure you want to delete the ‘Build settings UI’ task and its subtasks? This action cannot be reversed.</p>
            <div className='dt__button-group'>
                <button type='button' className='dt__button dt__button--delete' onClick={handleDeleteTask}>Delete</button>
                <button type='button' className='dt__button dt__button--cancel' onClick={handleCancel}>Cancel</button>
            </div>
      </section>
    </div>
  );
};

export default ModalDeleteTask;