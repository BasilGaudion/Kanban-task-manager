import axios from 'axios';

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

export const getBoardById = async (boardId: string) => {
  console.log('test');

};

// export default getAllBoards;
