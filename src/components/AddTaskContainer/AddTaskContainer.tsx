import React, { useContext } from 'react';
import './styles.scss';
import { ModalContext } from '../../utils/providers/useModalProvider';
import { Column as ColumnType } from '../../utils/Types/BoardTypes';
import { BoardContext } from '../../utils/providers/useBoardProvider';

interface ColumnProps {
  column: ColumnType;
}

const AddTaskContainer: React.FC<ColumnProps> = ({ column }) => {
  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    throw new Error('Task must be used within a ModalProvider');
  }

  const { showAddTask, setShowAddTask } = modalContext;

  const boardContext = useContext(BoardContext);

  if (!boardContext) {
    throw new Error('Task must be used within a themeProvider');
  }

  const { setCurrentColumnData } = boardContext;

  const handleShowAddTask = () => {
    setCurrentColumnData(column);
    setShowAddTask(!showAddTask);
  };

  return (
    <div
      className={`add-task ${column.tasks && column.tasks.length > 0 ? '' : 'add-task--empty'}`}
      onClick={handleShowAddTask}
    >
      <p className="add-task__title">+ New Task</p>
    </div>
  );
};

export default AddTaskContainer;
