import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';
import { IconCross } from "../../../assets";

interface ModalAddBoardProps {
    handleClose: () => void;
    isOpen: boolean;
}

const ModalAddBoard: React.FC<ModalAddBoardProps> = ({handleClose, isOpen }) => { 
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
    <div className={`ab ${modalAnimation}`}>
        <section className={`ab__container ${containerAnimation}`} ref={ref}>
            <h2 className='ab__action'>Add New Board</h2>
            <div className='ab__title-group'>
                <h3 className='ab__title'>Board Name</h3>
                <label htmlFor="ab__title" className="visuallyhidden">Enter the title of the Board</label>
                <input
                type="text"
                name="ab__title"
                id="ab__title"
                className='ab__input ab__input--title'
                placeholder='e.g. Web Design'
                />
            </div>
            <div className='ab__columns-group'>
                <h3 className='ab__title'>Board Columns</h3>
                <ul className='ab__columns'>
                    <li className='ab__column'>
                        <label htmlFor="ab__column1" className="visuallyhidden">Enter the first subtask</label>
                        <input
                        type="text"
                        name="ab__column1"
                        id="ab__column1"
                        className='ab__input ab__input--column'
                        placeholder='e.g. Make coffee'
                        />
                        <img src={IconCross} alt="" className='ab__column-delete'/>
                    </li>
                    <li className='ab__column'>
                        <label htmlFor="ab__column2" className="visuallyhidden">Enter the second column</label>
                        <input
                        type="text"
                        name="ab__column2"
                        id="ab__column2"
                        className='ab__input ab__input--column'
                        placeholder='e.g. Drink coffee & smile'
                        />
                        <img src={IconCross} alt="" className='ab__column-delete'/>
                    </li>
                    <li className='ab__column'>
                        <label htmlFor="ab__column3" className="visuallyhidden">Enter the third column</label>
                        <input
                        type="text"
                        name="ab__column3"
                        id="ab__column3"
                        className='ab__input ab__input--column'
                        placeholder='e.g. Drink coffee & smile'
                        />
                        <img src={IconCross} alt="" className='ab__column-delete'/>
                    </li>
                </ul>
                <button type='button' className='ab__button ab__button--add'>+ Add New column</button>
            </div>
            <button type='button' className='ab__button ab__button--create'>Create New Board</button>
        </section>
    </div>
  );
};

export default ModalAddBoard;
