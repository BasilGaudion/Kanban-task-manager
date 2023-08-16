import React, { useState, useContext, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ModalContext } from "../../utils/providers/useModalProvider";
import { ThemeContext } from "../../utils/providers/useThemeProvider";
import { AsideContext } from "../../utils/providers/useAsideProvider";
import { BoardContext } from "../../utils/providers/useBoardProvider";
import useWindowSize from '../../hooks/useWindowSize';

// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/pagination';

import './styles.scss';
import Column from '../Column';

import { Scrollbar } from 'swiper/modules';
import CreateColumn from '../CreateColumn';


const Main = () => {
  const [haveColums, setHaveColums] = useState(true);
  const themeContext = useContext(ThemeContext);
  const asideContext = useContext(AsideContext);
  const boardContext = useContext(BoardContext);
  const [largeWindow, setLargeWindow] = useState(true);
  const screenWidth = useWindowSize().width;

  useEffect(() => {
    if (screenWidth && screenWidth >= 768) {
      setLargeWindow(true);
    } else {
      setLargeWindow(false);
    }
  }, [screenWidth]);

  if (!themeContext) {
    throw new Error("Task must be used within a themeProvider");
  }

  const {isDarkTheme} = themeContext;

  if (!asideContext) {
    throw new Error("Task must be used within a asideProvider");
  }

  const { asideOpen, setAsideOpen } = asideContext;

    // ====== Board Context ==========
    if (!boardContext) {
      throw new Error("Task must be used within a asideProvider");
    }
  
    const {currentBoardData} = boardContext;

  return (
    <main className={`main ${isDarkTheme ? 'isDarkTheme' : 'isLightTheme'} ${asideOpen && largeWindow ? 'main--reduct' : ''}`}>
        {haveColums 
        
          ? 
          
          <div className='main__container container'>
            <Swiper
              slidesPerView={'auto'}
              simulateTouch={false}
              // spaceBetween={35}
              className="mySwiper"
              modules={[Scrollbar]}
              scrollbar={{ draggable: true }}
            >
              {currentBoardData.columns.map((column, index) => (
                <SwiperSlide key={index}>
                  <Column column={column} />
                </SwiperSlide>
              ))}
              <SwiperSlide><CreateColumn/></SwiperSlide>
            </Swiper>
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
