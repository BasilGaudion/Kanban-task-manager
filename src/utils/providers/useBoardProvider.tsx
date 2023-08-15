import React, { useState, createContext, useEffect } from 'react';
import boardsData from '../Data/data.json';
import { v4 as uuidv4 } from 'uuid';

// Types definition
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

interface Board {
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
}

export const BoardContext = createContext<IBoardContext | undefined>(undefined);

export const useBoardProvider = (): IBoardContext => {

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
  const generatedBoards = generateIdForBoards(boardsData.boards);

  const localStorageKey = "boardAppData";
  const storedData = localStorage.getItem(localStorageKey);

  let initializedData;
  if (storedData) {
    initializedData = JSON.parse(storedData);
} else {
    const generatedBoards = generateIdForBoards(boardsData.boards);
    initializedData = {
        boardData: generatedBoards[0],
        allBoards: generatedBoards.map((board: Board) => board.name)
    };
    localStorage.setItem(localStorageKey, JSON.stringify(initializedData));
}

  const [currentBoardData, setCurrentBoardData] = useState<Board>(initializedData.boardData);
  const [allBoardsName, setAllBoardsName] = useState<string[]>(initializedData.allBoards);
  const [currentBoard, setCurrentBoard] = useState<string>(initializedData.boardData.name);
  const [columnByBoard, setColumnByBoard] = useState<Column[]>(initializedData.boardData.columns);  
  const [tasksByColumn, setTasksByColumn] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [currentSubtask, setCurrentSubtask] = useState<Subtask | null>(null);
  const [subTasksByTask, setSubTasksByTask] = useState<Subtask[]>([]);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify({ boardData: currentBoardData, allBoards: allBoardsName }));
  }, [currentBoardData, allBoardsName]);

  useEffect(() => {
    const result = generatedBoards.find(board => board.name === currentBoard);
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

  const findColumnAndTaskIndices = (task: Task) => {
    const columnIdx = currentBoardData.columns.findIndex(col => col.tasks.some(t => t.id === task.id));

    if (columnIdx === -1) return { columnIdx: -1, taskIdx: -1 };

    const taskIdx = currentBoardData.columns[columnIdx].tasks.findIndex(t => t.id === task.id);
    return { columnIdx, taskIdx };
  }

  useEffect(() => {
    if (currentTask) {
        const { columnIdx, taskIdx } = findColumnAndTaskIndices(currentTask);
        
        if (columnIdx === -1 || taskIdx === -1) {
            console.error("Couldn't locate the task or column");
            return;
        }

        const boardCopy = { ...currentBoardData };
        boardCopy.columns[columnIdx].tasks[taskIdx] = currentTask;
        setCurrentBoardData(boardCopy);
    }
  }, [currentTask]);

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
    // Clone des données actuelles pour éviter des mutations directes
    const currentData = {...currentBoardData};

    if (!currentData || !currentData.columns) {
      console.error("currentData ou currentData.columns est indéfini");
      return;
  }
    // Trover la colonne correspondante basée sur le statut de la nouvelle tâche
    const targetColumn = currentData.columns.filter(column => column).find(column => column.name === newTask.status);
  
    if (!targetColumn) return; // Gérer l'erreur, par exemple avec un message ou une notification

    // Ajouter la nouvelle tâche à cette colonne
    targetColumn.tasks.push(newTask);

    const boardCopy = {...currentData}; 
    const allBoardsName = currentBoard;

    // Mise à jour du contexte pour refléter les changements dans l'application
    setCurrentBoardData(currentData);

    localStorage.setItem('boardAppData', JSON.stringify({ boardData: boardCopy, allBoards: allBoardsName }));

    // Stocker les données dans le localStorage
    // localStorage.setItem("boardAppData", JSON.stringify(currentData));
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
    createTask,
  };
};

