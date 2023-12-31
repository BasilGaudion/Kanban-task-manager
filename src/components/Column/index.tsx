import React, { useContext } from 'react';
import './styles.scss';
import { Droppable } from 'react-beautiful-dnd';
import Task from '../Task';
import { Column as ColumnType, Task as TaskType } from '../../utils/Types/BoardTypes';
import AddTaskContainer from '../AddTaskContainer/AddTaskContainer';
import { IconEditPurple } from '../../assets';
import { ModalContext } from '../../utils/providers/useModalProvider';
import { BoardContext } from '../../utils/providers/useBoardProvider';

interface ColumnProps {
  column: ColumnType;
  containerRef: React.RefObject<HTMLDivElement>;
}

const Column: React.FC<ColumnProps> = ({ column, containerRef }) => {
  const modalContext = useContext(ModalContext);
  const background = column.color;

  if (!modalContext) {
    throw new Error('Task must be used within a ModalProvider');
  }

  const { showEditColumn, setShowEditColumn } = modalContext;

  const boardContext = useContext(BoardContext);

  if (!boardContext) {
    throw new Error('Task must be used within a BoardProvider');
  }

  const { setCurrentColumnData } = boardContext;

  const handleShowEditColumn = () => {
    setCurrentColumnData(column);
    setShowEditColumn(!showEditColumn);
  };

  return (
    <section className="column">
      <div className="column__title-group">
        <div className="column__title-color-text">
          <span className="column__color" style={{ backgroundColor: background }} />
          <h3 className="column__title">{column.name}
            ({column.tasks.length})
          </h3>
        </div>
        <div className="column__edit-icon-container">
          <img src={IconEditPurple} alt="" className="column__edit-icon" onClick={handleShowEditColumn} />
        </div>
      </div>
      <Droppable droppableId={column._id || ''}>
        {(provided) => (
          <div
            className="column__scrollable"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {column.tasks.map((task: TaskType, index: number) => (
              <Task key={task._id} task={task} index={index} containerRef={containerRef} />
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
