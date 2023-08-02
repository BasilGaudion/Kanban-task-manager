import React from 'react';
import './styles.scss';
import Task from '../Task';

const Column = () => {
  return (
    <section className='column'>
      <div className='column__title-group'>
        <span className='column__color'></span>
        <h3 className='column__title'>Todo (4)</h3>
      </div>
      <section className='column__tasks'>
        <Task/>
        <Task/>
        <Task/>
        <Task/>
        <Task/>
        <Task/>
        <Task/>
      </section>
    </section>
  );
};

export default Column;