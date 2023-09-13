import React, { useContext } from 'react';
import './styles.scss';
import { LoginContext } from '../../utils/providers/useLoginProvider';
import HomeDescription from '../../components/HomeDescription';
import Login from '../../components/Login';
import Register from '../../components/Register';
import { ModalContext } from '../../utils/providers/useModalProvider';

const HomePage = () => {
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    throw new Error('Task must be used within a themeProvider');
  }

  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    throw new Error('Task must be used within a ModalProvider');
  }

  const {
    showLogin, setShowLogin, showRegister, setShowRegister,
  } = modalContext;

  return (
    <>
      <HomeDescription />
      {showLogin && <Login handleClose={() => setShowLogin(false)} isOpen />}
      {showRegister && <Register handleClose={() => setShowRegister(false)} isOpen />}
    </>
  );
};

export default HomePage;
