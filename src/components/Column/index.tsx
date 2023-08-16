import React, { useContext } from 'react';
import './styles.scss';
import Task from '../Task';
import { Column as ColumnType, Task as TaskType } from '../../utils/providers/useBoardProvider';
import AddTaskContainer from '../AddTaskContainer/AddTaskContainer';
import { Droppable } from 'react-beautiful-dnd';
import { ItemTypes } from '../../utils/Types/DnDTypes';
import { BoardContext } from "../../utils/providers/useBoardProvider";

interface ColumnProps {
  column: ColumnType;
}

interface DraggedTaskItem {
  id: string;
  status: string;
  index: number;
}

const Column: React.FC<ColumnProps> = ({ column }) => {
  const boardContext = useContext(BoardContext);

  if (!boardContext) {
    throw new Error("Task must be used within a themeProvider");
  }

  const {moveTaskToColumn} = boardContext;

  return (
    <section className='column'>
      <div className='column__title-group'>
        <span className='column__color'></span>
        <h3 className='column__title'>{column.name} ({column.tasks.length})</h3>
      </div>
      <Droppable droppableId={column.name}>
        {(provided, snapshot) => (
          <div 
            className='column__scrollable'
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
      <AddTaskContainer />
    </section>
  );
};

export default Column;
