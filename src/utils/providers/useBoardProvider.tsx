import React, { useState, createContext, useEffect } from 'react';
import boardsData from '../Data/data.json';

// Types definition
export interface Subtask {
  title: string;
  isCompleted: boolean;
}

export interface Task {
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
}

export interface Column {
  name: string;
  tasks: Task[];
}

interface Board {
    name: string;
    columns: Column[];
}

interface IBoardContext {
    currentBoard: string;
    setCurrentBoard: React.Dispatch<React.SetStateAction<string>>;
    currentBoardData: Board;
    setCurrentBoardData: React.Dispatch<React.SetStateAction<Board>>;
    allBoardsName: string[];
    setAllBoardsName: React.Dispatch<React.SetStateAction<string[]>>;
    columnByBoard: Column[];
    setColumnByBoard: React.Dispatch<React.SetStateAction<Column[]>>;
    tasksByColumn: Task[];
    setTasksByColumn: React.Dispatch<React.SetStateAction<Task[]>>;
    subTasksByTask: Subtask[];
    setSubTasksByTask: React.Dispatch<React.SetStateAction<Subtask[]>>;
    currentTask: Task | null;
    setCurrentTask: React.Dispatch<React.SetStateAction<Task | null>>;
    currentSubtask: Subtask | null;
    setCurrentSubtask: React.Dispatch<React.SetStateAction<Subtask | null>>;
    updateSubtask: (subtaskTitle: string) => void;
}

export const BoardContext = createContext<IBoardContext | undefined>(undefined);

export const useBoardProvider = (): IBoardContext => {
  const localStorageKey = "boardAppData";

  const initialStorageData = {
    boardData: boardsData.boards[0],
    allBoards: boardsData.boards.map((board: Board) => board.name)
  };

  const storedData = localStorage.getItem(localStorageKey);
  
  const dataFromStorage = storedData ? JSON.parse(storedData) : initialStorageData;

  const [currentBoardData, setCurrentBoardData] = useState<Board>(dataFromStorage.boardData);
  const [allBoardsName, setAllBoardsName] = useState<string[]>(dataFromStorage.allBoards);

  const [currentBoard, setCurrentBoard] = useState<string>(dataFromStorage.boardData.name);
  const [columnByBoard, setColumnByBoard] = useState<Column[]>(dataFromStorage.boardData.columns);
  const [tasksByColumn, setTasksByColumn] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [currentSubtask, setCurrentSubtask] = useState<Subtask | null>(null);
  const [subTasksByTask, setSubTasksByTask] = useState<Subtask[]>([]);

  useEffect(() => {
    if (!localStorage.getItem(localStorageKey)) {
      localStorage.setItem(localStorageKey, JSON.stringify(initialStorageData));
    }
  }, []);

  useEffect(() => {
    const result = boardsData.boards.find(board => board.name === currentBoard);
    if (result) {
      setCurrentBoardData(result);
      setColumnByBoard(result.columns);
      if(result.columns.length) {
          setTasksByColumn(result.columns[0].tasks);
      }
    }
  }, [currentBoard]);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify({ boardData: currentBoardData, allBoards: allBoardsName }));
  }, [currentBoardData, allBoardsName]);

  function updateSubtask(subtaskTitle: string) {
    if(!currentTask) return;

    const subtaskIndex = currentTask.subtasks.findIndex(st => st.title === subtaskTitle);

    if (subtaskIndex === -1) return;

    const updatedSubtasks = [...currentTask.subtasks];
    updatedSubtasks[subtaskIndex].isCompleted = !updatedSubtasks[subtaskIndex].isCompleted;

    const updatedTask = { ...currentTask, subtasks: updatedSubtasks };
    setCurrentTask(updatedTask);

    const boardCopy = { ...currentBoardData };
    const columnIdx = boardCopy.columns.findIndex(col => col.tasks.includes(currentTask));
    const taskIdx = boardCopy.columns[columnIdx].tasks.findIndex(task => task === currentTask);

    boardCopy.columns[columnIdx].tasks[taskIdx] = updatedTask;
    setCurrentBoardData(boardCopy);

    localStorage.setItem('boardAppData', JSON.stringify({ boardData: boardCopy, allBoards: allBoardsName }));

  }

  

  return {
    currentBoard,
    setCurrentBoard,
    currentBoardData,
    setCurrentBoardData,
    allBoardsName,
    setAllBoardsName,
    columnByBoard,
    setColumnByBoard,
    tasksByColumn,
    setTasksByColumn,
    subTasksByTask,
    setSubTasksByTask,
    currentTask,
    setCurrentTask,
    updateSubtask,
    currentSubtask,
    setCurrentSubtask,
  };
};

