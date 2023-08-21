import React, { useState, createContext, useEffect } from 'react';
import boardsData from '../Data/data.json';
import { v4 as uuidv4 } from 'uuid';

// ===================== TYPES DEFINITION =====================

export interface Subtask {
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
}

export interface Column {
  id: string;
  name: string;
  tasks: Task[];
}

export interface Board {
    id: string;
    name: string;
    columns: Column[];
}

interface RawBoard {
  name: string;
  columns: {
    name: string;
    tasks: {
      title: string;
      description: string;
      status: string;
      subtasks: {
        title: string;
        isCompleted: boolean;
      }[];
    }[];
  }[];
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
    createTask: (newTask: Task) => void;
    createColumn: (newColumn: Column) => void;
    createBoard: (newBoard: Board) => void;
    updateBoard: (updatedBoard: Board) => void;
    deleteBoard: (boardToDelete: Board) => void;
    deleteTask: (task: Task) => void;
    moveTaskToColumn: (taskId: string, newStatus: string, sourceIndex: number, targetIndex: number) => void; 
}

export const BoardContext = createContext<IBoardContext | undefined>(undefined);

// ===================== MAIN BOARD PROVIDER =====================

export const useBoardProvider = (): IBoardContext => {
  const localStorageKey = "boardAppData";

  // --------------- Initialization ---------------

  const generateIdForBoards = (boards: RawBoard[]): Board[] => {
    return boards.map(board => ({
      ...board,
      id: uuidv4(),
      columns: board.columns.map(column => ({
        ...column,
        id: uuidv4(),
        tasks: column.tasks.map(task => ({
          ...task,
          id: uuidv4(),
          subtasks: task.subtasks.map(subtask => ({
            ...subtask,
            id: uuidv4()
          }))
        }))
      }))
    }));
  };

  const getStoredData = () => {
    const storedData = localStorage.getItem(localStorageKey);
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      const generatedBoards = generateIdForBoards(boardsData.boards);
      const defaultData = {
        allBoardsData: generatedBoards,
        allBoards: generatedBoards.map((board: Board) => board.name)
      };
      localStorage.setItem(localStorageKey, JSON.stringify(defaultData));
      return defaultData;
    }
  };

  const initializedData = getStoredData();

  // --------------- States ---------------


  const [allBoards, setAllBoards] = useState<Board[]>(initializedData.allBoardsData);
  const [currentBoardData, setCurrentBoardData] = useState<Board>(initializedData.allBoardsData[0]);
  const [allBoardsName, setAllBoardsName] = useState<string[]>(initializedData.allBoards);
  const [currentBoard, setCurrentBoard] = useState<string>(initializedData.allBoardsData[0].name);
  const [columnByBoard, setColumnByBoard] = useState<Column[]>(currentBoardData.columns);
  const [tasksByColumn, setTasksByColumn] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [currentSubtask, setCurrentSubtask] = useState<Subtask | null>(null);
  const [subTasksByTask, setSubTasksByTask] = useState<Subtask[]>([]);


  // --------------- Effects & LocalStorage Sync ---------------

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify({ allBoardsData: allBoards, allBoards: allBoardsName }));
  }, [allBoards, allBoardsName]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(localStorageKey) || '{}');
    const result = storedData.allBoardsData.find((board: Board) => board.name === currentBoard);
    if (result) {
      setCurrentBoardData(result);
      setColumnByBoard(result.columns);
      if (result.columns.length) {
        setTasksByColumn(result.columns[0].tasks);
      }
    }
  }, [currentBoard]);

  // --------------- Helper Functions ---------------

  const findColumnAndTaskIndices = (task: Task) => {
    const columnIdx = currentBoardData.columns.findIndex(col => col.tasks.some(t => t.id === task.id));
    if (columnIdx === -1) return { columnIdx: -1, taskIdx: -1 };
    const taskIdx = currentBoardData.columns[columnIdx].tasks.findIndex(t => t.id === task.id);
    return { columnIdx, taskIdx };
  };

  // --------------- Actions ---------------


  const updateSubtask = (subtaskTitle: string) => {
    if(!currentTask) return;

    const subtaskIndex = currentTask.subtasks.findIndex(st => st.title === subtaskTitle);

    if (subtaskIndex === -1) return;

    const updatedSubtasks = [...currentTask.subtasks];
    updatedSubtasks[subtaskIndex].isCompleted = !updatedSubtasks[subtaskIndex].isCompleted;

    const updatedTask = { ...currentTask, subtasks: updatedSubtasks };
    
    const { columnIdx, taskIdx } = findColumnAndTaskIndices(updatedTask);

    if (columnIdx === -1 || taskIdx === -1) {
        console.error("Couldn't locate the task or column");
        return;
    }

    const boardCopy = { ...currentBoardData };
    boardCopy.columns[columnIdx].tasks[taskIdx] = updatedTask;
    setCurrentBoardData(boardCopy);

    localStorage.setItem('boardAppData', JSON.stringify({ boardData: boardCopy, allBoards: allBoardsName }));
  }



  const createTask = (newTask: Task) => {
    const currentData = {...currentBoardData};

    if (!currentData || !currentData.columns) {
      console.error("currentData ou currentData.columns est indéfini");
      return;
  }
    const targetColumn = currentData.columns.filter(column => column).find(column => column.name === newTask.status);
  
    if (!targetColumn) return; 
    targetColumn.tasks.push(newTask);

    const boardCopy = {...currentData}; 
    const allBoardsName = currentBoard;

    setCurrentBoardData(currentData);

    localStorage.setItem('boardAppData', JSON.stringify({ boardData: boardCopy, allBoards: allBoardsName }));
  }



  const createColumn = (newColumn: Column) => {
    const currentData = {...currentBoardData};

    if (!currentData) {
      console.error("currentData ou currentData.columns est indéfini");
      return;
    }
    
    currentData.columns.push(newColumn);

    const boardCopy = {...currentData}; 
    const allBoardsName = currentBoard;

    setCurrentBoardData(currentData);

    localStorage.setItem('boardAppData', JSON.stringify({ boardData: boardCopy, allBoards: allBoardsName }));
  }



  const createBoard = (newBoard: Board) => {
    const updatedBoards = [...allBoards, newBoard];
    setAllBoards(updatedBoards);

    const updatedBoardNames = updatedBoards.map(board => board.name);
    setAllBoardsName(updatedBoardNames);

    setCurrentBoardData(newBoard);
    setCurrentBoard(newBoard.name);

    localStorage.setItem(localStorageKey, JSON.stringify({ allBoardsData: updatedBoards, allBoards: updatedBoardNames }));
  };



  const updateBoard = (updatedBoard: Board) => {
    if (currentBoardData.id === updatedBoard.id) {
        setCurrentBoardData(updatedBoard);
    }
    localStorage.setItem(localStorageKey, JSON.stringify({ boardData: updatedBoard, allBoards: allBoardsName }));
  }

  const deleteBoard = (boardToDelete: Board) => {
    // Supprimer le tableau des données de stockage local, s'il est présent.
    let storedData = JSON.parse(localStorage.getItem(localStorageKey) || '{}');
    if (storedData.boardData?.id === boardToDelete.id) {
      if (allBoardsName.length > 1) {
        const newCurrentBoardName = allBoardsName.find(name => name !== boardToDelete.name) || '';
        const newCurrentBoardData = generateIdForBoards(boardsData.boards).find(board => board.name === newCurrentBoardName) || null;
        
        // Mise à jour du tableau courant dans le stockage local
        storedData.boardData = newCurrentBoardData;
        setCurrentBoard(newCurrentBoardName);
        setCurrentBoardData(newCurrentBoardData!);
        setColumnByBoard(newCurrentBoardData?.columns || []);
      } else {
        // S'il n'y a pas d'autres tableaux, réinitialisez le tableau courant
        storedData.boardData = null;
        setCurrentBoard('');
        setCurrentBoardData({} as Board);
        setColumnByBoard([]);
      }
    }
  
    // Mettre à jour le tableau de noms des tableaux.
    const updatedBoardsName = allBoardsName.filter(name => name !== boardToDelete.name);
    storedData.allBoards = updatedBoardsName;
    setAllBoardsName(updatedBoardsName);
  
    // Mettre à jour le stockage local
    localStorage.setItem(localStorageKey, JSON.stringify(storedData));
  }
  


  const deleteTask = (task: Task) => {
    const boardCopy = { ...currentBoardData };
    const columnContainingTask = boardCopy.columns.find(column => column.tasks.some(t => t.id === task.id));
    if (!columnContainingTask) {
        console.error("Couldn't find column containing the task");
        return;
    }

    const taskIndex = columnContainingTask.tasks.findIndex(t => t.id === task.id);
    if (taskIndex === -1) {
        console.error("Couldn't find the task");
        return;
    }

    columnContainingTask.tasks.splice(taskIndex, 1);

    setCurrentBoardData(boardCopy);

    localStorage.setItem(localStorageKey, JSON.stringify({ boardData: boardCopy, allBoards: allBoardsName }));
};

  // ==============DRAG AND DROP====================

  const moveTaskToColumn = (
    taskId: string,
    newStatus: string,
    sourceIndex: number,
    targetIndex: number
) => {
    const boardCopy = { ...currentBoardData };
    const sourceColumn = boardCopy.columns.find(column => column.tasks.some(task => task.id === taskId));
    const destinationColumn = boardCopy.columns.find(column => column.name === newStatus);

    if (sourceColumn && destinationColumn) {
        const [movedTask] = sourceColumn.tasks.splice(sourceIndex, 1);
        movedTask.status = newStatus;
        destinationColumn.tasks.splice(targetIndex, 0, movedTask);
    }

    setCurrentBoardData(boardCopy);
    localStorage.setItem('boardAppData', JSON.stringify({ boardData: boardCopy, allBoards: allBoardsName }));
};

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
    createTask,
    moveTaskToColumn,
    createColumn,
    createBoard,
    deleteTask,
    updateBoard,
    deleteBoard,
  };
};

