import React from 'react';
import './styles.scss';
import Task from '../Task';
import { Column as ColumnType, Task as TaskType } from '../../utils/providers/useBoardProvider';
import AddTaskContainer from '../AddTaskContainer/AddTaskContainer';

interface ColumnProps {
  column: ColumnType;
}

const ColumnComponent: React.FC<ColumnProps> = ({ column }) => {
  return (
    <section className='column'>
      <div className='column__title-group'>
        <span className='column__color'></span>
        <h3 className='column__title'>{column.name} ({column.tasks.length})</h3>
      </div>
      {
        column.tasks.length < 1 
        ? 
          <></>
        : 
          <div className='column__scrollable'>
            {column.tasks.map((task: TaskType, index: number) => (
                <Task key={index} task={task} />
            ))}
          </div>
      }
      
      <AddTaskContainer />
    </section>
  );
};

export default ColumnComponent;
