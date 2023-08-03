import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';
import { IconCross } from "../../../assets";

interface ModalAddTaskProps {
    handleClose: () => void;
    isOpen: boolean;
}

const ModalAddTask: React.FC<ModalAddTaskProps> = ({handleClose, isOpen }) => { 
    const ref = useRef<HTMLDivElement>(null);
    const [containerAnimation, setContainerAnimation] = useState('pop-in');
    const [modalAnimation, setModalAnimation] = useState('modal-open');

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
    <div className={`at ${modalAnimation}`}>
        <section className={`at__container ${containerAnimation}`} ref={ref}>
            <h2 className='at__action'>Add New Task</h2>
            <div className='at__title-group'>
                <h3 className='at__title'>Title</h3>
                <label htmlFor="at__title" className="visuallyhidden">Enter the title of the task</label>
                <input
                type="text"
                name="at__title"
                id="at__title"
                className='at__input at__input--title'
                placeholder='e.g. Take coffee break'
                />
            </div>
            <div className='at__description-group'>
                <h3 className='at__title'>Description</h3>
                <label htmlFor="at__description" className="visuallyhidden">Enter the description of the task</label>
                <textarea
                name="at__description"
                id="at__description"
                className='at__input at__input--description'
                placeholder='e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little.'
                />
            </div>
            <div className='at__subtasks-group'>
                <h3 className='at__title'>Subtasks</h3>
                <ul className='at__subtasks'>
                    <li className='at__subtask'>
                        <label htmlFor="at__subtask1" className="visuallyhidden">Enter the first subtask</label>
                        <input
                        type="text"
                        name="at__subtask1"
                        id="at__subtask1"
                        className='at__input at__input--subtask'
                        placeholder='e.g. Make coffee'
                        />
                        <img src={IconCross} alt="" className='at__subtask-delete'/>
                    </li>
                    <li className='at__subtask'>
                        <label htmlFor="at__subtask2" className="visuallyhidden">Enter the second subtask</label>
                        <input
                        type="text"
                        name="at__subtask2"
                        id="at__subtask2"
                        className='at__input at__input--subtask'
                        placeholder='e.g. Drink coffee & smile'
                        />
                        <img src={IconCross} alt="" className='at__subtask-delete'/>
                    </li>
                    <li className='at__subtask'>
                        <label htmlFor="at__subtask3" className="visuallyhidden">Enter the third subtask</label>
                        <input
                        type="text"
                        name="at__subtask3"
                        id="at__subtask3"
                        className='at__input at__input--subtask'
                        placeholder='e.g. Drink coffee & smile'
                        />
                        <img src={IconCross} alt="" className='at__subtask-delete'/>
                    </li>
                </ul>
                <button type='button' className='at__button at__button--add'>+ Add New Subtask</button>
            </div>
            <div className='at__status-group'>
                <h3 className='at__title'>Status</h3>
                <label htmlFor="subtasks" className="visuallyhidden">Select status of the task</label>
                <select className='at__select' id='subtasks'>
                    <option value="0">Doing</option>
                    <option value="1">Todo</option>
                    <option value="2">Finished</option>
                    <option value="3">Bug report</option>
                </select>
            </div>
            <button type='button' className='at__button at__button--create'>Create Task</button>
        </section>
    </div>
  );
};

export default ModalAddTask;
