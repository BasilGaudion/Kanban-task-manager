import React, { useContext } from 'react';
import './styles.scss';
import { ModalContext } from "../../utils/providers/useModalProvider";

const AddTaskContainer = () => {
  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    throw new Error("Task must be used within a ModalProvider");
  }

  const { showAddTask, setShowAddTask } = modalContext;

  const handleShowAddTask = () => {
    setShowAddTask(!showAddTask);
  }

  return (
    <div className='addTask' onClick={handleShowAddTask}>
      <p className='addTask__title'>+ New Task</p>
    </div>
  );
};

export default AddTaskContainer;