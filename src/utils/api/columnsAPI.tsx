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

export const deleteBoard = async () => {
  console.log('coucou');
};
