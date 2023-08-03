import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';
import { IconVerticalEllipsis } from '../../assets';

interface ModalViewTaskProps {
    handleClose: () => void;
    isOpen: boolean;
}

const ModalViewTask: React.FC<ModalViewTaskProps> = ({ handleClose, isOpen }) => {
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
    
    <div className={`vt ${modalAnimation}`}>
        <section className={`vt__container ${containerAnimation}`} ref={ref}>
        <div className='vt__title-group'>
            <h2 className='vt__title'>Researche pricing points of various competitors and trial differents business models </h2>
            <img src={IconVerticalEllipsis} className="vt__ellipsis" alt="" />
        </div>
        <p className='vt__text'>We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.</p>
        <h4 className='vt__subtitle'>Subtasks (2 of 3)</h4>
        <ul className='vt__checkgroup'>
        <li className='vt__check-item'>
            <input type="checkbox" name="one" id="one" className='vt__checkbox' />
            <label htmlFor="one">Research competitor pricing and business models</label>
        </li>
        <li className='vt__check-item'>
            <input type="checkbox" name="two" id="two" className='vt__checkbox' />
            <label htmlFor="two">Research competitor pricing and business models</label>
        </li>
        <li className='vt__check-item'>
            <input type="checkbox" name="three" id="three" className='vt__checkbox' />
            <label htmlFor="three">Research competitor pricing and business models</label>
        </li>
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