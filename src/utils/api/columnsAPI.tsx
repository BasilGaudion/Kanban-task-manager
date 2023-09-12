import axios from 'axios';
import { Column } from '../Types/BoardTypes';

export const createNewColumn = async (boardId: string, newColumn: Column) => {
  const authToken = localStorage.getItem('authToken');
  const config = {
    headers: { Authorization: `Bearer ${authToken}` },
  };
  try {
    const result = await axios.post(
      `https://kanban-task-manager-backend.vercel.app/api/boards/${boardId}/columns`,
      newColumn,
      config,
    );
    return result.data;
  }
  catch (error) {
    return null;
  }
};

export const editColumn = async (boardId: string, editedColumn: Column) => {
  const columnId = editedColumn._id;
  const authToken = localStorage.getItem('authToken');
  const config = {
    headers: { Authorization: `Bearer ${authToken}` },
  };
  try {
    const result = await axios.put(
      `https://kanban-task-manager-backend.vercel.app/api/boards/${boardId}/columns/${columnId}`,
      editedColumn,
      config,
    );
    return result.data;
  }
  catch (error) {
    return null;
  }
};

export const deleteColumn = async (boardId: string, columnId: string) => {
  const authToken = localStorage.getItem('authToken');
  const config = {
    headers: { Authorization: `Bearer ${authToken}` },
  };
  try {
    const result = await axios.delete(
      `https://kanban-task-manager-backend.vercel.app/api/boards/${boardId}/columns/${columnId}`,
      config,
    );
    return result.data;
  }
  catch (error) {
    return null;
  }
};
