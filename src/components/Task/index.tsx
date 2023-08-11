import React, { useContext } from 'react';
import { ModalContext } from "../../utils/providers/useModalProvider";
import { ThemeContext } from "../../utils/providers/useThemeProvider";
import { Task as TaskType } from '../../utils/providers/useBoardProvider';
import { BoardContext } from "../../utils/providers/useBoardProvider";

import './styles.scss';

interface TaskProps {
  task: TaskType;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const themeContext = useContext(ThemeContext);
  const boardContext = useContext(BoardContext);

  if (!boardContext) {
    throw new Error("Task must be used within a themeProvider");
  }

  const {currentTask, setCurrentTask} = boardContext;


  if (!themeContext) {
    throw new Error("Task must be used within a themeProvider");
  }

  const {isDarkTheme} = themeContext;

  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    throw new Error("Task must be used within a ModalProvider");
  }

  const { showViewTask, setShowViewTask } = modalContext;

  const handleShowTask = () => {
    setCurrentTask(task);
    setShowViewTask(!showViewTask);
  }

  const completedSubtasks = task.subtasks.filter(subtask => subtask.isCompleted).length;

  return (
    <div className={`task ${isDarkTheme ? 'isDarkTheme' : 'isLightTheme'}`} onClick={handleShowTask}>
      <div className='task__container'>
        <h2 className='task__title'>{task.title}</h2>
        <h4 className='task__subtitle'>{completedSubtasks} of {task.subtasks.length} subtasks</h4>
      </div>
    </div>
  );
};

export default Task;
