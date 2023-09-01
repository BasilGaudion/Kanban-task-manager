import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

// Interface
interface IUserContext {
  isConnected: boolean;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
  token: string | null; // Explicitly allow null
  setToken: React.Dispatch<React.SetStateAction<string | null>>; // Explicitly allow null
  login: (userData: { emailLogin: string; passwordLogin: string }) => void;
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

  const login = async (userData: { emailLogin: string; passwordLogin: string }) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email: userData.emailLogin,
        password: userData.passwordLogin,
      });
      setToken(response.data.token);
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userId', JSON.stringify(response.data.userId));
        setIsConnected(true);
      }
    }
    catch (error) {
      // throw new Error('Adresse E-mail et/ou le mot de passe incorrects');
      toast.error('Incorrect email address or password', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
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
