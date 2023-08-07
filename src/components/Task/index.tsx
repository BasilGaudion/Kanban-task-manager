import React, { useContext } from 'react';
import { ModalContext } from "../../utils/providers/useModalProvider";
import { ThemeContext } from "../../utils/providers/useThemeProvider";

import './styles.scss';


const Task = () => {
  const themeContext = useContext(ThemeContext);

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
    setShowViewTask(!showViewTask);
  }

  return (
    <div className={`task ${isDarkTheme ? 'isDarkTheme' : 'isLightTheme'}`} onClick={handleShowTask}>
      <div className='task__container'>
        <h2 className='task__title'>Build UI for onboarding flow</h2>
        <h4 className='task__subtitle'>0 of 3 subtasks</h4>
      </div>
    </div>
  );
};

export default Task;
