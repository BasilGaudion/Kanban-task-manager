import React, { useContext } from 'react';
import { ModalContext } from "../../utils/providers/useModalProvider";
import { ThemeContext } from "../../utils/providers/useThemeProvider";
import { Task as TaskType } from '../../utils/providers/useBoardProvider';
import { BoardContext } from "../../utils/providers/useBoardProvider";
import { ItemTypes } from '../../utils/Types/DnDTypes';
import { Draggable } from 'react-beautiful-dnd';


import './styles.scss';

interface TaskProps {
  task: TaskType;
  index: number;
}

const Task: React.FC<TaskProps> = ({ task, index }) => {
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
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`task ${isDarkTheme ?'isDarkTheme' : 'isLightTheme'}`}
          onClick={handleShowTask}
          style={{
            ...provided.draggableProps.style,
          }}
        >
          <div className='task__container'>
            <h2 className='task__title'>{task.title}</h2>
            <h4 className='task__subtitle'>{completedSubtasks} of {task.subtasks.length} subtasks</h4>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
