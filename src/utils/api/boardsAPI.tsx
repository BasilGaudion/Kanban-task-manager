import axios from 'axios';
import { Board } from '../Types/BoardTypes';
// import { BoardContext } from '../providers/useBoardProvider';

// if (!BoardContext) {
//   throw new Error('Task must be used within a asideProvider');
// }

// const { setAllBoardsData, allBoardsData } = BoardContext;

export const getAllBoards = async () => {
  const authToken = localStorage.getItem('authToken');
  const config = {
    headers: { Authorization: `Bearer ${authToken}` },
  };
  try {
    const result = await axios.get('http://localhost:3000/api/boards', config);
    return result.data;
  }
  catch (error) {
    return null;
  }
};

export const createNewBoard = async (newBoard: Board) => {
  const authToken = localStorage.getItem('authToken');
  const config = {
    headers: { Authorization: `Bearer ${authToken}` },
  };
  try {
    const result = await axios.post(
      'http://localhost:3000/api/boards',
      newBoard,
      config,
    );
    return result.data;
  }
  catch (error) {
    console.log('🚀 ~ file: BoardsAPI.tsx:33 ~ error:', error);
    return null;
  }
};

export const getBoardById = async () => {
  console.log('test');

};
