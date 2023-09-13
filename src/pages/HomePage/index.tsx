import React, { useContext } from 'react';
import './styles.scss';
import { LoginContext } from '../../utils/providers/useLoginProvider';
import HomeDescription from '../../components/HomeDescription';
import Login from '../../components/Login';
import Register from '../../components/Register';

const HomePage = () => {
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    throw new Error('Task must be used within a themeProvider');
  }

  const { isLoginVisible, setIsLoginVisible } = loginContext;

  const hiddenLogin = () => {
    setIsLoginVisible(false);
  };

  const showLogin = () => {
    setIsLoginVisible(true);
  };

  return (
    <HomeDescription />
  );
};

export default HomePage;
