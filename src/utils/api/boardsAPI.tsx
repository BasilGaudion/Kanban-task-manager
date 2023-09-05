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

export const deleteBoard = async (id: string) => {
  const authToken = localStorage.getItem('authToken');
  const config = {
    headers: { Authorization: `Bearer ${authToken}` },
  };
  try {
    const result = await axios.delete(
      `http://localhost:3000/api/boards/${id}`,
      config,
    );
    console.log('🚀 ~ file: BoardsAPI.tsx:52 ~ result:', result.data);
    return result.data;
  }
  catch (error) {
    console.log('🚀 ~ file: BoardsAPI.tsx:33 ~ error:', error);
    return null;
  }
};

export const updateBoard = async (id: string, updatedBoard: Board) => {
  const authToken = localStorage.getItem('authToken');
  const config = {
    headers: { Authorization: `Bearer ${authToken}` },
  };
  try {
    const result = await axios.put(
      `http://localhost:3000/api/boards/${id}`,
      updatedBoard,
      config,
    );
    console.log('🚀 ~ file: BoardsAPI.tsx:52 ~ result:', result.data);
    return result.data;
  }
  catch (error) {
    console.log('🚀 ~ file: BoardsAPI.tsx:33 ~ error:', error);
    return null;
  }
};
