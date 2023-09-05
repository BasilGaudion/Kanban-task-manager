import axios from 'axios';
import { Board } from '../Types/BoardTypes';

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
  console.log('🚀 ~ file: BoardsAPI.tsx:19 ~ newBoard:', newBoard);
  const authToken = localStorage.getItem('authToken');
  console.log('🚀 ~ file: BoardsAPI.tsx:21 ~ authToken:', authToken);
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
