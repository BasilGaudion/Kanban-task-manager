// useModalProvider.tsx
import React, { useState, createContext } from 'react';

interface IModalContext {
  showViewTask: boolean;
  setShowViewTask: React.Dispatch<React.SetStateAction<boolean>>;
  showAddTask: boolean;
  setShowAddTask: React.Dispatch<React.SetStateAction<boolean>>;
  showEditTask: boolean;
  setShowEditTask: React.Dispatch<React.SetStateAction<boolean>>;
  showViewBoard: boolean;
  setShowViewBoard: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalContext = createContext<IModalContext | undefined>(undefined);

export const useModalProvider = (): IModalContext => {
  const [showViewTask, setShowViewTask] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);
  const [showViewBoard, setShowViewBoard] = useState(false);

  return {
    showViewTask,
    setShowViewTask,
    showAddTask,
    setShowAddTask,
    showEditTask,
    setShowEditTask,
    showViewBoard,
    setShowViewBoard,
  };
};
