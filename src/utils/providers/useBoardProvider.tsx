import React, { createContext, useEffect, useState } from 'react';
import { getAllBoards, updateBoard } from '../api/boardsAPI';
import { Board, Column, Task } from '../Types/BoardTypes';

interface IBoardContext {
  allBoardsData: Board[];
  setAllBoardsData: React.Dispatch<React.SetStateAction<Board[]>>;
  currentBoardData: Board;
  setCurrentBoardData: React.Dispatch<React.SetStateAction<Board>>;
  currentColumnData: Column;
  setCurrentColumnData: React.Dispatch<React.SetStateAction<Column>>;
  currentTaskData: Task;
  setCurrentTaskData: React.Dispatch<React.SetStateAction<Task>>;
  moveTaskToColumn: (
    taskId: string,
    newStatus: string,
    sourceIndex: number,
    targetIndex: number,
  ) => void;
}

export const BoardContext = createContext<IBoardContext | undefined>(undefined);

export const useBoardProvider = (): IBoardContext => {
  const isConnected = localStorage.getItem('isConnected');

  // ============== STATES =================
  const [allBoardsData, setAllBoardsData] = useState<Board[]>([]);
  const [currentBoardData, setCurrentBoardData] = useState<Board>({} as Board);
  const [currentColumnData, setCurrentColumnData] = useState<Column>({} as Column);
  const [currentTaskData, setCurrentTaskData] = useState<Task>({} as Task);

  // ============ USE EFFECTS ==============

  useEffect(() => {
    const fetchBoards = async () => {
      if (isConnected) {
        try {
          const allBoards = await getAllBoards();
          setAllBoardsData(allBoards);

          if (allBoards.length > 0) {
            setCurrentBoardData(allBoards[0]);
          }
        }
        catch (error) {
          console.error('An error occurred while fetching boards:', error);
        }
      }
    };

    fetchBoards();
  }, [isConnected]);

  // ==============DRAG AND DROP====================

  const moveTaskToColumn = async (
    taskId: string,
    newStatus: string,
    sourceIndex: number,
    targetIndex: number,
  ) => {
    const boardCopy = { ...currentBoardData };
    const sourceColumn = boardCopy.columns.find((column) => column.tasks.some((task) => task._id === taskId));
    const destinationColumn = boardCopy.columns.find((column) => column._id === newStatus);

    if (sourceColumn && destinationColumn && sourceColumn.tasks && destinationColumn.tasks) {
      const [movedTask] = sourceColumn.tasks.splice(sourceIndex, 1);
      movedTask.status = newStatus;
      destinationColumn.tasks.splice(targetIndex, 0, movedTask);
    }

    if (boardCopy._id) {
      const updatedBoard = await updateBoard(boardCopy._id, boardCopy);
      if (updatedBoard) {
        setCurrentBoardData(boardCopy);
      }
    }
  };

  return {
    allBoardsData,
    setAllBoardsData,
    currentBoardData,
    setCurrentBoardData,
    currentColumnData,
    setCurrentColumnData,
    currentTaskData,
    setCurrentTaskData,
    moveTaskToColumn,
  };
};
