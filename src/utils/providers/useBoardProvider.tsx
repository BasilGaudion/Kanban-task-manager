import React, { createContext, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import { getAllBoards } from '../api/boardsAPI';
import { Board } from '../Types/BoardTypes';

interface IBoardContext {
  allBoardsData: Board[];
  setAllBoardsData: React.Dispatch<React.SetStateAction<Board[]>>;
  currentBoardData: Board;
  setCurrentBoardData: React.Dispatch<React.SetStateAction<Board>>;
}

export const BoardContext = createContext<IBoardContext | undefined>(undefined);

export const useBoardProvider = (): IBoardContext => {
  const isConnected = localStorage.getItem('isConnected');

  // ============== STATES =================
  const [allBoardsData, setAllBoardsData] = useState<Board[]>([]);
  const [currentBoardData, setCurrentBoardData] = useState<Board>({} as Board);

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

  // const moveTaskToColumn = (
  //   taskId: string,
  //   newStatus: string,
  //   sourceIndex: number,
  //   targetIndex: number,
  // ) => {
  //   const boardCopy = { ...currentBoardData };
  //   const sourceColumn = boardCopy.columns.find((column) => column.tasks.some((task) => task.id === taskId));
  //   const destinationColumn = boardCopy.columns.find((column) => column.name === newStatus);

  //   if (sourceColumn && destinationColumn && sourceColumn.tasks && destinationColumn.tasks) {
  //     const [movedTask] = sourceColumn.tasks.splice(sourceIndex, 1);
  //     movedTask.status = newStatus;
  //     destinationColumn.tasks.splice(targetIndex, 0, movedTask);
  //   }

  //   setCurrentBoardData(boardCopy);

  //   // Récupération des données actuelles dans le localStorage sous la clé boardAppData
  //   const currentLocalStorageData = JSON.parse(localStorage.getItem('boardAppData') || '{}');

  //   // Mise à jour de allBoardsData dans l'objet récupéré
  //   const updatedAllBoardsData = currentLocalStorageData.allBoardsData || [];
  //   const boardIndex = updatedAllBoardsData.findIndex((board: Board) => board.id === boardCopy.id);
  //   if (boardIndex !== -1) {
  //     updatedAllBoardsData[boardIndex] = boardCopy;
  //   }
  //   else {
  //     updatedAllBoardsData.push(boardCopy);
  //   }
  //   currentLocalStorageData.allBoardsData = updatedAllBoardsData;

  //   // Sauvegarde des données modifiées dans le localStorage sous la clé boardAppData
  //   localStorage.setItem('boardAppData', JSON.stringify(currentLocalStorageData));
  // };

  return {
    allBoardsData,
    setAllBoardsData,
    currentBoardData,
    setCurrentBoardData,
  };
};
