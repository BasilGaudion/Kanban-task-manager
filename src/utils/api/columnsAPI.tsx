import axios from 'axios';
import { Column } from '../Types/BoardTypes';

export const createNewColumn = async (boardId: string, newColumn: Column) => {
  console.log('🚀 ~ file: columnsAPI.tsx:5 ~ boardId:', boardId);
  console.log('🚀 ~ file: columnsAPI.tsx:5 ~ newColumn:', newColumn);
  const authToken = localStorage.getItem('authToken');
  const config = {
    headers: { Authorization: `Bearer ${authToken}` },
  };
  console.log('🚀 ~ file: columnsAPI.tsx:11 ~ config:', config);
  try {
    const result = await axios.post(
      `http://localhost:3000/api/boards/${boardId}/columns`,
      newColumn,
      config,
    );
    return result.data;
  }
  catch (error) {
    console.log('🚀 ~ file: BoardsAPI.tsx:33 ~ error:', error);
    return null;
  }
};

export const editColumn = async (boardId: string, editedColumn: Column) => {
  const columnId = editedColumn._id;
  const authToken = localStorage.getItem('authToken');
  const config = {
    headers: { Authorization: `Bearer ${authToken}` },
  };
  console.log('🚀 ~ file: columnsAPI.tsx:11 ~ config:', config);
  try {
    const result = await axios.put(
      `http://localhost:3000/api/boards/${boardId}/columns/${columnId}`,
      editedColumn,
      config,
    );
    return result.data;
  }
  catch (error) {
    console.log('🚀 ~ file: BoardsAPI.tsx:33 ~ error:', error);
    return null;
  }
};

export const deleteColumn = async (boardId: string, columnId: string) => {
  console.log('🚀 ~ file: columnsAPI.tsx:48 ~ boardId:', boardId);
  console.log('🚀 ~ file: columnsAPI.tsx:48 ~ columnId:', columnId);
  const authToken = localStorage.getItem('authToken');
  console.log('🚀 ~ file: columnsAPI.tsx:51 ~ authToken:', authToken);
  const config = {
    headers: { Authorization: `Bearer ${authToken}` },
  };
  try {
    const result = await axios.delete(
      `http://localhost:3000/api/boards/${boardId}/columns/${columnId}`,
      config,
    );
    return result.data;
  }
  catch (error) {
    console.log('🚀 ~ file: BoardsAPI.tsx:33 ~ error:', error);
    return null;
  }
};

export const deleteBoard = async () => {
  console.log('coucou');
};
