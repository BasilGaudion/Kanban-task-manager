import React, { useState, createContext, useEffect } from 'react';
import boardsData from '../Data/data.json';

// Types definition
interface Subtask {
    title: string;
    isCompleted: boolean;
}

interface Task {
    title: string;
    description: string;
    status: string;
    subtasks: Subtask[];
}

interface Column {
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
}


export const BoardContext = createContext<IBoardContext | undefined>(undefined);

export const useBoardProvider = (): IBoardContext => {
  const [currentBoard, setCurrentBoard] = useState<string>('');
  const [currentBoardData, setCurrentBoardData] = useState<Board>(boardsData.boards[0]);
  const [allBoardsName, setAllBoardsName] = useState<string[]>(boardsData.boards.map((board: Board) => board.name));
  const [columnByBoard, setColumnByBoard] = useState<Column[]>([]);
  const [tasksByColumn, setTasksByColumn] = useState<Task[]>([]);
  const [subTasksByTask, setSubTasksByTask] = useState<Subtask[]>([]);

  useEffect(() => {
    const result = boardsData.boards.find(board => board.name === currentBoard);
    if (result) {
        setCurrentBoardData(result);
    }
  }, [currentBoard]);


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
    setSubTasksByTask
  };
};
