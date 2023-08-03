import React, { useState, useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import ModalViewTask from '../ModalViewTask';
import { ModalContext } from "../../utils/providers/useModalProvider";

// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/pagination';

import './styles.scss';
import Column from '../Column';

import { Pagination } from 'swiper/modules';

const Main = () => {
  const [haveColums, setHaveColums] = useState(true);
  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    throw new Error("Task must be used within a ModalProvider");
  }

  const { showViewTask, setShowViewTask } = modalContext;

  return (
    <main className='main'>
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
            </Swiper>
            {showViewTask && <ModalViewTask handleClose={() => setShowViewTask(false)} isOpen/>}
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
