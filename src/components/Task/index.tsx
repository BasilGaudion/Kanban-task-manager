import React, {
  useContext, useRef,
} from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ModalContext } from '../../utils/providers/useModalProvider';
import { ThemeContext } from '../../utils/providers/useThemeProvider';
import { Task as TaskType } from '../../utils/Types/BoardTypes';
import { BoardContext } from '../../utils/providers/useBoardProvider';
import { AsideContext } from '../../utils/providers/useAsideProvider';
import { ScrollContext } from '../../utils/providers/useScrollProvider';

import './styles.scss';

interface TaskProps {
  task: TaskType;
  index: number;
  containerRef: React.RefObject<HTMLDivElement>;
}

const Task: React.FC<TaskProps> = ({ task, index, containerRef }) => {
  const themeContext = useContext(ThemeContext);
  const boardContext = useContext(BoardContext);
  const asideContext = useContext(AsideContext);
  const scrollContext = useContext(ScrollContext);
  const taskRef = useRef<HTMLElement | null>(null);

  if (!scrollContext) {
    throw new Error('Task must be used within a ScrollProvider');
  }

  if (!boardContext) {
    throw new Error('Task must be used within a themeProvider');
  }

  const { setCurrentTaskData, setCurrentColumnData, currentBoardData } = boardContext;

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
    setCurrentColumnData(currentBoardData.columns.find((column) => column.tasks.some((taskInColumn) => taskInColumn._id === task._id))!);
    setCurrentTaskData(task);
    setShowViewTask(!showViewTask);
  };

  if (!asideContext) {
    throw new Error('Task must be used within a asideProvider');
  }
  const { asideOpen } = asideContext;

  const completedSubtasks = task?.subtasks?.filter((subtask) => subtask.isCompleted).length;

  return (
    <Draggable
      draggableId={task._id || 'defaultId'}
      index={index}
    >
      {(provided, snapshot) => {
        // handleDrag(snapshot);
        if (snapshot.isDragging && provided.draggableProps.style) {
          const style = provided.draggableProps.style as React.CSSProperties;
          const initialLeft = Number(style.left?.toString().split('px')[0]);
          let adjustedLeft = initialLeft;

          if (asideOpen) {
            adjustedLeft = initialLeft - 264;
          }

          if (taskRef.current) {
            taskRef.current.style.setProperty('left', `${adjustedLeft}px`, 'important');
          }
        }

        return (
          <div
            ref={(ref) => {
              provided.innerRef(ref);
              taskRef.current = ref;
            }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`task ${isDarkTheme ? 'isDarkTheme' : 'isLightTheme'} ${asideOpen ? 'task--aside' : ''}`}
            onClick={handleShowTask}
          >
            <div className="task__container" style={task.color ? { borderLeft: `8px solid ${task.color}` } : {}}>
              <h2 className="task__title">{task.title}</h2>
              <h4 className="task__subtitle">{completedSubtasks} of {task?.subtasks?.length} subtasks</h4>
            </div>
          </div>
        );
      }}
    </Draggable>
  );

};

export default Task;
