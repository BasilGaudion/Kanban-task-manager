import React, { useEffect, useRef, useState, useContext } from 'react';
import './styles.scss';
import { IconCross } from "../../../assets";
import { ModalContext } from "../../../utils/providers/useModalProvider";
import { ThemeContext } from "../../../utils/providers/useThemeProvider";

interface ModalEditTaskProps {
    handleClose: () => void;
    isOpen: boolean;
}

const ModalEditTask: React.FC<ModalEditTaskProps> = ({handleClose, isOpen }) => { 
    const ref = useRef<HTMLDivElement>(null);
    const [containerAnimation, setContainerAnimation] = useState('pop-in');
    const [modalAnimation, setModalAnimation] = useState('modal-open');
    const modalContext = useContext(ModalContext);

    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
      throw new Error("Task must be used within a themeProvider");
    }
  
    const {isDarkTheme} = themeContext;

    if (!modalContext) {
        throw new Error("Task must be used within a ModalProvider");
    }

    const { showViewTask, setShowViewTask, showEditTask, setShowEditTask } = modalContext;

    const handleEditTask = () => {
        setContainerAnimation('pop-out');
        setModalAnimation('modal-closed');
        setTimeout(() => {
            handleClose();
            setShowEditTask(!showEditTask);
            setShowViewTask(!showViewTask);
        }, 300); // durée de l'animation de fermeture
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

  return (
    <div className={`et ${modalAnimation} ${isDarkTheme ? 'isDarkTheme' : 'isLightTheme'}`}>
        <section className={`et__container ${containerAnimation}`} ref={ref}>
            <h2 className='et__action'>Edit Task</h2>
            <div className='et__title-group'>
                <h3 className='et__title'>Title</h3>
                <label htmlFor="et__title" className="visuallyhidden">Enter the title of the task</label>
                <input
                type="text"
                name="et__title"
                id="et__title"
                className='et__input et__input--title'
                placeholder='e.g. Take coffee break'
                />
            </div>
            <div className='et__description-group'>
                <h3 className='et__title'>Description</h3>
                <label htmlFor="et__description" className="visuallyhidden">Enter the description of the task</label>
                <textarea
                name="et__description"
                id="et__description"
                className='et__input et__input--description'
                placeholder='e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little.'
                />
            </div>
            <div className='et__subtasks-group'>
                <h3 className='et__title'>Subtasks</h3>
                <ul className='et__subtasks'>
                    <li className='et__subtask'>
                        <label htmlFor="et__subtask1" className="visuallyhidden">Enter the first subtask</label>
                        <input
                        type="text"
                        name="et__subtask1"
                        id="et__subtask1"
                        className='et__input et__input--subtask'
                        placeholder='e.g. Make coffee'
                        />
                        <img src={IconCross} alt="" className='et__subtask-delete'/>
                    </li>
                    <li className='et__subtask'>
                        <label htmlFor="et__subtask2" className="visuallyhidden">Enter the second subtask</label>
                        <input
                        type="text"
                        name="et__subtask2"
                        id="et__subtask2"
                        className='et__input et__input--subtask'
                        placeholder='e.g. Drink coffee & smile'
                        />
                        <img src={IconCross} alt="" className='et__subtask-delete'/>
                    </li>
                    <li className='et__subtask'>
                        <label htmlFor="et__subtask3" className="visuallyhidden">Enter the third subtask</label>
                        <input
                        type="text"
                        name="et__subtask3"
                        id="et__subtask3"
                        className='et__input et__input--subtask'
                        placeholder='e.g. Drink coffee & smile'
                        />
                        <img src={IconCross} alt="" className='et__subtask-delete'/>
                    </li>
                </ul>
                <button type='button' className='et__button et__button--add'>+ Add New Subtask</button>
            </div>
            <div className='et__status-group'>
                <h3 className='et__title'>Status</h3>
                <label htmlFor="subtasks" className="visuallyhidden">Select status of the task</label>
                <select className='et__select' id='subtasks'>
                    <option value="0">Doing</option>
                    <option value="1">Todo</option>
                    <option value="2">Finished</option>
                    <option value="3">Bug report</option>
                </select>
            </div>
            <button type='button' className='et__button et__button--create' onClick={handleEditTask}>Edit Task</button>
        </section>
    </div>
  );
};

export default ModalEditTask;
