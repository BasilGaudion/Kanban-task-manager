import React, { useContext, useRef } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ModalContext } from '../../utils/providers/useModalProvider';
import { ThemeContext } from '../../utils/providers/useThemeProvider';
import { Task as TaskType, BoardContext } from '../../utils/providers/useBoardProvider';
import { AsideContext } from '../../utils/providers/useAsideProvider';
import { ScrollContext } from '../../utils/providers/useScrollProvider';
import { ItemTypes } from '../../utils/Types/DnDTypes';

import './styles.scss';

interface TaskProps {
  task: TaskType;
  index: number;
}

const Task: React.FC<TaskProps> = ({ task, index }) => {
  const themeContext = useContext(ThemeContext);
  const boardContext = useContext(BoardContext);
  const asideContext = useContext(AsideContext);
  const scrollContext = useContext(ScrollContext);
  const taskRef = useRef<HTMLElement | null>(null);

  if (!scrollContext) {
    throw new Error('Task must be used within a ScrollProvider');
  }

  const { scrollX } = scrollContext;
  console.log('Current scrollbar position:', scrollX); // Log pour observer les changements de scrollX

  if (!boardContext) {
    throw new Error('Task must be used within a themeProvider');
  }

  const { currentTask, setCurrentTask } = boardContext;

  if (!themeContext) {
    throw new Error('Task must be used within a themeProvider');
  }

  const { isDarkTheme } = themeContext;

  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    throw new Error('Task must be used within a ModalProvider');
  }

  const { showViewTask, setShowViewTask } = modalContext;

  const handleShowTask = () => {
    setCurrentTask(task);
    setShowViewTask(!showViewTask);
  };

  if (!asideContext) {
    throw new Error('Task must be used within a asideProvider');
  }
  const { asideOpen } = asideContext;

  const completedSubtasks = task.subtasks.filter((subtask) => subtask.isCompleted).length;

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => {
        if (snapshot.isDragging && provided.draggableProps.style) {
          const style = provided.draggableProps.style as React.CSSProperties;
          const initialLeft = Number(style.left?.toString().split('px')[0]);
          console.log('Initial left:', initialLeft);
          console.log('ScrollX:', scrollX);
          let adjustedLeft = initialLeft; // Initialize to initial left

          // To have the right value, InitialLeft - AdjustedLeft should be 264
          if (asideOpen) {
            adjustedLeft = initialLeft - 264;
          }

          console.log('Adjusted left:', adjustedLeft);

          // Use the new ref to access the DOM element
          if (taskRef.current) {
            taskRef.current.style.setProperty('left', `${adjustedLeft}px`, 'important');
          }
        }

        return (
          <div
            ref={(ref) => {
              provided.innerRef(ref);
              taskRef.current = ref; // Update the new ref
            }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`task ${isDarkTheme ? 'isDarkTheme' : 'isLightTheme'} ${asideOpen ? 'task--aside' : ''}`}
            onClick={handleShowTask}
          >
            <div className="task__container">
              <h2 className="task__title">{task.title}</h2>
              <h4 className="task__subtitle">{completedSubtasks} of {task.subtasks.length} subtasks</h4>
            </div>
          </div>
        );
      }}
    </Draggable>
  );

};

export default Task;
