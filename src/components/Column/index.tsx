import React from 'react';
import './styles.scss';
import Task from '../Task';
// Dans votre fichier de composant
import { Column as ColumnType, Task as TaskType } from '../../utils/providers/useBoardProvider';

// ... Utilisez les interfaces comme d'habitude dans votre composant
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
      <section className='column__tasks'>
      {column.tasks.map((task: TaskType, index: number) => (
          <Task key={index} task={task} />
        ))}
      </section>
    </section>
  );
};

export default ColumnComponent;
