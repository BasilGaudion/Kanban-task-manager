import React, { useEffect, useRef, useState, useContext } from 'react';
import './styles.scss';
import { IconVerticalEllipsis } from '../../../assets';
import { ModalContext } from "../../../utils/providers/useModalProvider";
import { ThemeContext } from "../../../utils/providers/useThemeProvider";
import { BoardContext } from "../../../utils/providers/useBoardProvider";

interface ModalViewTaskProps {
    handleClose: () => void;
    isOpen: boolean;
}

const ModalViewTask: React.FC<ModalViewTaskProps> = ({ handleClose, isOpen }) => {
    const ref = useRef<HTMLDivElement>(null);
    const settingsRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLImageElement>(null);
    const [containerAnimation, setContainerAnimation] = useState('pop-in');
    const [modalAnimation, setModalAnimation] = useState('modal-open');
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const modalContext = useContext(ModalContext);
    const boardContext = useContext(BoardContext);

    if (!boardContext) {
      throw new Error("Task must be used within a themeProvider");
    }
  
    const {currentTask, setCurrentTask} = boardContext;
    if (!currentTask) return null; 

    if (!modalContext) {
        throw new Error("Task must be used within a ModalProvider");
      }
    
      const { showEditTask, setShowEditTask } = modalContext;

      const themeContext = useContext(ThemeContext);

    if (!themeContext) {
      throw new Error("Task must be used within a themeProvider");
    }
  
    const {isDarkTheme} = themeContext;
    
      const handleShowEditTask = () => {
        setContainerAnimation('pop-out');
        setModalAnimation('modal-closed');
        setTimeout(() => {
        setShowEditTask(!showEditTask);
        handleClose();
        }, 250);
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

    useEffect(() => {
        const checkIfClickedOutsideSettings = (e: MouseEvent) => {

            if (isSettingsOpen && !settingsRef.current?.contains(e.target as Node) && !iconRef.current?.contains(e.target as Node)) {
                setIsSettingsOpen(false);
            }
        }
    
        document.addEventListener("mousedown", checkIfClickedOutsideSettings);
    
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutsideSettings);
        }
    }, [isSettingsOpen]);
    
    const completedSubtasks = currentTask.subtasks.filter(subtask => subtask.isCompleted).length;

  return (
    
    <div className={`vt ${modalAnimation} ${isDarkTheme ? 'isDarkTheme' : 'isLightTheme'}`}>
        <section className={`vt__container ${containerAnimation}`} ref={ref}>
        <div className='vt__title-group'>
        <h2 className='vt__title'>{currentTask?.title}</h2>
            <img ref={iconRef} src={IconVerticalEllipsis} className="vt__ellipsis" alt="" onClick= {() => setIsSettingsOpen(!isSettingsOpen)} />
            <div className={`vt__options ${isSettingsOpen ? '' : 'disable'}`} ref={settingsRef}>
                <p className='vt__option' onClick={handleShowEditTask}>Edit Task</p>
                <p className='vt__option vt__option--delete'>Delete Task</p>
            </div>
        </div>
        <p className='vt__text'>{currentTask?.description}</p>
        <h4 className='vt__subtitle'>Subtasks ({completedSubtasks} of {currentTask?.subtasks.length})</h4>
        <ul className='vt__checkgroup'>
        {currentTask.subtasks.map(subtask => (
        <li className='vt__check-item'>
            <input type="checkbox" name="one" id="one" className='vt__checkbox' />
            <label htmlFor="one">Research competitor pricing and business models</label>
        </li>
        ))}
        </ul>
        <h4 className='vt__subtitle'>Subtasks (2 of 3)</h4>
        <div className="vt__select-block">
            <label htmlFor="subtasks" className="visuallyhidden">Select status</label>
            <select className='vt__select' id='subtasks'>
                <option value="0">Doing</option>
                <option value="1">Todo</option>
                <option value="2">Finished</option>
                <option value="3">Bug report</option>
            </select>
        </div>
      </section>
    </div>
  );
};

export default ModalViewTask;