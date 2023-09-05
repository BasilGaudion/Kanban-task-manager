import React, { useContext } from 'react';
import './styles.scss';
// import { ModalContext } from "../../utils/providers/useModalProvider";
import { Column as ColumnType } from '../../utils/Types/BoardTypes';

interface ColumnProps {
  column: ColumnType;
}

const AddTaskContainer: React.FC<ColumnProps> = ({column}) => {
  // const modalContext = useContext(ModalContext);

  // if (!modalContext) {
  //   throw new Error("Task must be used within a ModalProvider");
  // }

  // const { showAddTask, setShowAddTask } = modalContext;

  // const handleShowAddTask = () => {
  //   setShowAddTask(!showAddTask);
  // }

  return (
    <div
        // className={`addTask ${column.tasks.length < 1 ? "addTask--empty" : ""}`}
        // onClick={handleShowAddTask}
    >
      <p className="addTask__title">+ New Task</p>
    </div>
  );
};

export default AddTaskContainer;
