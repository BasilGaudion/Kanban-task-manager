import React from 'react';
import './styles.scss';

const Main = () => {
  return (
    <main className='main'>
        <div className='main__container container'>
        <h3 className='main__empty-board'>This board is empty. Create a new column to get started.</h3>
        <button type='button' className='main__button-column'>+ Add New Column</button>
        </div>
    </main>
  );
};

export default Main;