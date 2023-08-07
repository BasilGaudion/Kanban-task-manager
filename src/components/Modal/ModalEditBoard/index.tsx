import React, { useContext, useEffect, useRef, useState } from 'react';
import './styles.scss';
import { IconCross } from "../../../assets";
import { ThemeContext } from "../../../utils/providers/useThemeProvider";

interface ModalEditBoardProps {
    handleClose: () => void;
    isOpen: boolean;
}

const ModalEditBoard: React.FC<ModalEditBoardProps> = ({handleClose, isOpen }) => { 
    const ref = useRef<HTMLDivElement>(null);
    const [containerAnimation, setContainerAnimation] = useState('pop-in');
    const [modalAnimation, setModalAnimation] = useState('modal-open');

    const themeContext = useContext(ThemeContext);

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

  return (
    <div className={`eb ${modalAnimation} ${isDarkTheme ? 'isDarkTheme' : 'isLightTheme'}`}>
        <section className={`eb__container ${containerAnimation}`} ref={ref}>
            <h2 className='eb__action'>Edit Board</h2>
            <div className='eb__title-group'>
                <h3 className='eb__title'>Board Name</h3>
                <label htmlFor="eb__title" className="visuallyhidden">Enter the title of the Board</label>
                <input
                type="text"
                name="eb__title"
                id="eb__title"
                className='eb__input eb__input--title'
                placeholder='e.g. Web Design'
                />
            </div>
            <div className='eb__columns-group'>
                <h3 className='eb__title'>Board Columns</h3>
                <ul className='eb__columns'>
                    <li className='eb__column'>
                        <label htmlFor="eb__column1" className="visuallyhidden">Enter the first subtask</label>
                        <input
                        type="text"
                        name="eb__column1"
                        id="eb__column1"
                        className='eb__input eb__input--column'
                        placeholder='e.g. Make coffee'
                        />
                        <img src={IconCross} alt="" className='eb__column-delete'/>
                    </li>
                    <li className='eb__column'>
                        <label htmlFor="eb__column2" className="visuallyhidden">Enter the second column</label>
                        <input
                        type="text"
                        name="eb__column2"
                        id="eb__column2"
                        className='eb__input eb__input--column'
                        placeholder='e.g. Drink coffee & smile'
                        />
                        <img src={IconCross} alt="" className='eb__column-delete'/>
                    </li>
                    <li className='eb__column'>
                        <label htmlFor="eb__column3" className="visuallyhidden">Enter the third column</label>
                        <input
                        type="text"
                        name="eb__column3"
                        id="eb__column3"
                        className='eb__input eb__input--column'
                        placeholder='e.g. Drink coffee & smile'
                        />
                        <img src={IconCross} alt="" className='ab__column-delete'/>
                    </li>
                </ul>
                <button type='button' className='eb__button eb__button--add'>+ Add New column</button>
            </div>
            <button type='button' className='eb__button eb__button--create'>Create New Board</button>
        </section>
    </div>
  );
};

export default ModalEditBoard;
