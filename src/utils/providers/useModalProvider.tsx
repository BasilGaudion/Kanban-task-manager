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
  showAddBoard: boolean;
  setShowAddBoard: React.Dispatch<React.SetStateAction<boolean>>;
  showEditBoard: boolean;
  setShowEditBoard: React.Dispatch<React.SetStateAction<boolean>>;
  showAddColumn: boolean;
  setShowAddColumn: React.Dispatch<React.SetStateAction<boolean>>;
  showDeleteTask: boolean;
  setShowDeleteTask: React.Dispatch<React.SetStateAction<boolean>>;
  showDeleteBoard: boolean;
  setShowDeleteBoard: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalContext = createContext<IModalContext | undefined>(undefined);

export const useModalProvider = (): IModalContext => {
  const [showViewTask, setShowViewTask] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);
  const [showViewBoard, setShowViewBoard] = useState(false);
  const [showAddBoard, setShowAddBoard] = useState(false);
  const [showEditBoard, setShowEditBoard] = useState(false);
  const [showAddColumn, setShowAddColumn] = useState(false);
  const [showDeleteTask, setShowDeleteTask] = useState(false);
  const [showDeleteBoard, setShowDeleteBoard] = useState(false);

  return {
    showViewTask,
    setShowViewTask,
    showAddTask,
    setShowAddTask,
    showEditTask,
    setShowEditTask,
    showViewBoard,
    setShowViewBoard,
    showAddBoard,
    setShowAddBoard,
    showEditBoard,
    setShowEditBoard,
    showAddColumn,
    setShowAddColumn,
    showDeleteTask,
    setShowDeleteTask,
    showDeleteBoard,
    setShowDeleteBoard,
  };
};
