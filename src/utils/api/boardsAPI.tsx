import axios from 'axios';
import { Board } from '../Types/BoardTypes';

export const getAllBoards = async () => {
  const authToken = localStorage.getItem('authToken');
  const config = {
    headers: { Authorization: `Bearer ${authToken}` },
  };
  try {
    const result = await axios.get('https://kanban-task-manager-backend.vercel.app/api/boards', config);
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
      'https://kanban-task-manager-backend.vercel.app/api/boards',
      newBoard,
      config,
    );
    return result.data;
  }
  catch (error) {
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
      `https://kanban-task-manager-backend.vercel.app/api/boards/${id}`,
      config,
    );
    return result.data;
  }
  catch (error) {
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
      `https://kanban-task-manager-backend.vercel.app/api/boards/${id}`,
      updatedBoard,
      config,
    );
    return result.data;
  }
  catch (error) {
    return null;
  }
};
