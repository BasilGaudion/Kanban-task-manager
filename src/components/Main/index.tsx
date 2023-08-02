import React, { useState } from 'react';
import './styles.scss';
import Column from '../Column';

const Main = () => {
  const [haveColums, setHaveColums] = useState(true);

  return (
    <main className='main'>
        {haveColums 
        
          ? 
          <div className='main__container container'>
            <Column/>
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
