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
  const localStorageKeyBoardData = "boardData";
  const localStorageKeyAllBoards = "allBoardsName";
  const storedBoardData = localStorage.getItem(localStorageKeyBoardData);
  const storedAllBoardsName = localStorage.getItem(localStorageKeyAllBoards);
  const initialBoardData = storedBoardData ? JSON.parse(storedBoardData) : boardsData.boards[0];
  const initialAllBoardsName = storedAllBoardsName ? JSON.parse(storedAllBoardsName) : boardsData.boards.map((board: Board) => board.name);
  
  const [currentBoardData, setCurrentBoardData] = useState<Board>(initialBoardData);
  const [allBoardsName, setAllBoardsName] = useState<string[]>(initialAllBoardsName);
  const [currentBoard, setCurrentBoard] = useState<string>('');
  const [columnByBoard, setColumnByBoard] = useState<Column[]>([]);
  const [tasksByColumn, setTasksByColumn] = useState<Task[]>([]);
  const [subTasksByTask, setSubTasksByTask] = useState<Subtask[]>([]);

  useEffect(() => {
    if (!localStorage.getItem("BoardData")) {
      localStorage.setItem("BoardData", JSON.stringify(boardsData));
    }
  }, []);

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
