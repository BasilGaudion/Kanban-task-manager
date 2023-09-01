import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Interface
interface IUserContext {
  isConnected: boolean;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
  token: string | null; // Explicitly allow null
  setToken: React.Dispatch<React.SetStateAction<string | null>>; // Explicitly allow null
  login: (email: string, password: string) => void;
  signIn: (userData: { email: string; password: string }) => void;
  logout: () => void;
}

// Context Initialization
export const UserContext = createContext<IUserContext | undefined>(undefined);

// Custom Hook
export const useUserProvider = (): IUserContext => {
  const getLocalStorage = (key: string, initialValue: unknown): unknown => {
    const value = window.localStorage.getItem(key);
    return value ?? initialValue; // If value is null or undefined, return initialValue
  };

  const [isConnected, setIsConnected] = useState(() => getLocalStorage('isConnected', false) as boolean);
  const [token, setToken] = useState<string | null>(null); // Initialize to null
  const navigate = useNavigate();

  // Update local storage whenever `isConnected` changes
  useEffect(() => {
    window.localStorage.setItem('isConnected', String(isConnected)); // Convert boolean to string
  }, [isConnected]);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        username: email,
        password: password,
      });
      setToken(response.data.token);
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setIsConnected(true);
      }
    }
    catch {
      throw new Error('Adresse E-mail et/ou le mot de passe incorrects');
    }
  };

  const signIn = async (userData: { email: string; password: string }) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/signup', {
        email: userData.email,
        password: userData.password,
      });
      console.log(response);
    }
    catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsConnected(false);
    navigate('/login');
  };

  return {
    isConnected,
    setIsConnected,
    token,
    setToken,
    login,
    signIn,
    logout,
  };
};
