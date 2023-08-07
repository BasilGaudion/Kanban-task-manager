import React, { useState, useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import ModalViewTask from '../Modal/ModalViewTask';
import ModalAddTask from '../Modal/ModalAddTask';
import ModalEditTask from '../Modal/ModalEditTask';
import ModalViewBoard from '../Modal/ModalViewBoard';
import { ModalContext } from "../../utils/providers/useModalProvider";
import { ThemeContext } from "../../utils/providers/useThemeProvider";

// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/pagination';

import './styles.scss';
import Column from '../Column';

import { Pagination } from 'swiper/modules';
import CreateColumn from '../CreateColumn';
import ModalAddBoard from '../Modal/ModalAddBoard';
import ModalEditBoard from '../Modal/ModalEditBoard';

const Main = () => {
  const [haveColums, setHaveColums] = useState(true);
  const modalContext = useContext(ModalContext);
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("Task must be used within a themeProvider");
  }

  const {isDarkTheme} = themeContext;

  if (!modalContext) {
    throw new Error("Task must be used within a ModalProvider");
  }

  const { showViewTask, setShowViewTask, showAddTask, setShowAddTask, showEditTask, setShowEditTask, showViewBoard, setShowViewBoard, showAddBoard, setShowAddBoard, showEditBoard, setShowEditBoard } = modalContext;

  return (
    <main className={`main ${isDarkTheme ? 'isDarkTheme' : 'isLightTheme'}`}>
        {haveColums 
        
          ? 
          
          <div className='main__container container'>
            <Swiper
              slidesPerView={'auto'}
              // spaceBetween={35}
              className="mySwiper"
            >
              <SwiperSlide><Column/></SwiperSlide>
              <SwiperSlide><Column/></SwiperSlide>
              <SwiperSlide><Column/></SwiperSlide>
              <SwiperSlide><Column/></SwiperSlide>
              <SwiperSlide><CreateColumn/></SwiperSlide>
            </Swiper>
            {showEditBoard && <ModalEditBoard handleClose={() => setShowEditBoard(false)} isOpen/>}
            {showViewBoard && <ModalViewBoard handleClose={() => setShowViewBoard(false)} isOpen/>}
            {showAddBoard && <ModalAddBoard handleClose={() => setShowAddBoard(false)} isOpen/>}
            {showViewTask && <ModalViewTask handleClose={() => setShowViewTask(false)} isOpen/>}
            {showAddTask && <ModalAddTask handleClose={() => setShowAddTask(false)} isOpen />}
            {showEditTask && <ModalEditTask handleClose={() => setShowEditTask(false)} isOpen />}
          </div>

          : 

          <div className='main__container--empty container'>
            <h3 className='main__empty-board'>This board is empty. Create a new column to get started.</h3>
            <button type='button' className='main__button-column'>+ Add New Column</button>
          </div>
        }
    </main>
  );
};

export default Main;
