import axios from 'axios';
import { Task } from '../Types/BoardTypes';

export const createNewTask = async (boardId: string, columnId: string, newTask: Task) => {
  const authToken = localStorage.getItem('authToken');
  const config = {
    headers: { Authorization: `Bearer ${authToken}` },
  };
  try {
    const result = await axios.post(
      `http://localhost:3000/api/boards/${boardId}/columns/${columnId}/tasks`,
      newTask,
      config,
    );
    return result.data;
  }
  catch (error) {
    console.log('🚀 ~ file: BoardsAPI.tsx:33 ~ error:', error);
    return null;
  }
};

export const editTask = async (boardId: string, columnId: string, editedTask: Task) => {
  const taskId = editedTask._id;
  const authToken = localStorage.getItem('authToken');
  const config = {
    headers: { Authorization: `Bearer ${authToken}` },
  };
  try {
    const result = await axios.put(
      `http://localhost:3000/api/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
      editedTask,
      config,
    );
    return result.data;
  }
  catch (error) {
    console.log('🚀 ~ file: BoardsAPI.tsx:33 ~ error:', error);
    return null;
  }
};

export const deleteTask = async (boardId: string, columnId: string, taskId: string) => {
  const authToken = localStorage.getItem('authToken');
  const config = {
    headers: { Authorization: `Bearer ${authToken}` },
  };
  try {
    const result = await axios.delete(
      `http://localhost:3000/api/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
      config,
    );
    return result.data;
  }
  catch (error) {
    console.log('🚀 ~ file: BoardsAPI.tsx:33 ~ error:', error);
    return null;
  }
};
