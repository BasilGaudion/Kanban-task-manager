import React, { useContext } from 'react';
import './styles.scss';
import { Droppable } from 'react-beautiful-dnd';
import Task from '../Task';
import { Column as ColumnType, Task as TaskType, BoardContext } from '../../utils/providers/useBoardProvider';
import AddTaskContainer from '../AddTaskContainer/AddTaskContainer';
import { ItemTypes } from '../../utils/Types/DnDTypes';

interface ColumnProps {
  column: ColumnType;
}

// interface DraggedTaskItem {
//   id: string;
//   status: string;
//   index: number;
// }

const Column: React.FC<ColumnProps> = ({ column }) => {
  return (
    <section className="column">
      <div className="column__title-group">
        <span className="column__color" />
        <h3 className="column__title">{column.name} ({column.tasks.length})</h3>
      </div>
      <Droppable droppableId={column.name}>
        {(provided) => (
          <div
            className="column__scrollable"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {column.tasks.map((task: TaskType, index: number) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <AddTaskContainer column={column} />
    </section>
  );
};

export default Column;
