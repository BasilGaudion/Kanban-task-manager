import React, { useEffect, useRef, useState, useContext } from 'react';
import './styles.scss';
import { IconBoard, IconBoardPurple } from "../../../assets";
import ThemeManager from '../../ThemeManager';
import { ModalContext } from "../../../utils/providers/useModalProvider";
import { ThemeContext } from "../../../utils/providers/useThemeProvider";
import useWindowSize from '../../../hooks/useWindowSize';



interface ModalViewBoardProps {
    handleClose: () => void;
    isOpen: boolean;
}

const ModalViewBoard: React.FC<ModalViewBoardProps> = ({handleClose, isOpen }) => { 
    const ref = useRef<HTMLDivElement>(null);
    const [largeWindow, setLargeWindow] = useState(true);
    const screenWidth = useWindowSize().width;
    const [containerAnimation, setContainerAnimation] = useState('go-down');
    const [modalAnimation, setModalAnimation] = useState('modal-open');
    const modalContext = useContext(ModalContext);

    if (!modalContext) {
        throw new Error("Task must be used within a ModalProvider");
      }
    
      const { showAddBoard, setShowAddBoard } = modalContext;

      const themeContext = useContext(ThemeContext);

    if (!themeContext) {
      throw new Error("Task must be used within a themeProvider");
    }
  
    const {isDarkTheme} = themeContext;

    useEffect(() => {
        if (screenWidth && screenWidth >= 768) {
          setLargeWindow(true);
        } else {
          setLargeWindow(false);
        }
      }, [screenWidth]);

    useEffect(() => {
        if (isOpen) {
            setContainerAnimation('go-down');
            setModalAnimation('modal-open');
        } else {
            setContainerAnimation('go-up');
            setModalAnimation('modal-closed');
        }
    }, [isOpen]);

    useEffect(() => {
        const checkIfClickedOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setContainerAnimation('go-up');
                setModalAnimation('modal-closed');
                setTimeout(handleClose, 300);
            }
        }
    
        document.addEventListener("mousedown", checkIfClickedOutside);
    
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside);
        }
    }, [handleClose]);

    const handleShowAddBoard = () => {
        setContainerAnimation('go-up');
        setModalAnimation('modal-closed');
        setTimeout(() => {
        setShowAddBoard(!showAddBoard);
        handleClose();
        }, 250);
    }

  return (
    <>
    {
        largeWindow
        ?
        <></>
        :
        <div className={`vb ${modalAnimation} ${isDarkTheme ? 'isDarkTheme' : 'isLightTheme'}`}>
            <section className={`vb__container ${containerAnimation}`} ref={ref}>
                <h3 className='vb__title'>All Boards (3)</h3>
                <ul className='vb__list'>
                    <li className='vb__item vb__item--current'>
                        <img src={IconBoard} alt="" />
                        <p className='vb__item-title vb__item-title--current'>Platform Launch</p>
                    </li>
                    <li className='vb__item'>
                        <img src={IconBoard} alt="" />
                        <p className='vb__item-title'>Marketing Plan</p>
                    </li>
                    <li className='vb__item'>
                        <img src={IconBoard} alt="" />
                        <p className='vb__item-title'>Roadmap</p>
                    </li>
                    <li className='vb__item vb__item--create' onClick={handleShowAddBoard}>
                        <img src={IconBoardPurple} alt="" />
                        <p className='vb__item-title vb__item-title--create'>+ Create New Board</p>
                    </li>
                </ul>
                <ThemeManager />
            </section>
        </div>
      }
    
    </>
  );
};

export default ModalViewBoard;
