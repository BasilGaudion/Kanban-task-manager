import React, { useContext, useState } from 'react';
import './styles.scss';
import { LoginContext } from "../../utils/providers/useLoginProvider";
import HomeDescription from '../../components/HomeDescription';
import Login from '../../components/Login';
import Register from '../../components/Register';

const HomePage = () => {
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    throw new Error("Task must be used within a themeProvider");
  }

  const {isLoginVisible, setIsLoginVisible} = loginContext;

  const hiddenLogin = () => {
    setIsLoginVisible(false);
  };

  const showLogin = () => {
    setIsLoginVisible(true);
  };
  
  return (
    <div className='home-page container'>
      <HomeDescription />
      <span></span>
      <div className='home-page__content'>
        <div className="home-page__buttons">
          <button className={`home-page__button ${isLoginVisible ? "show" : ""}`} type="button" onClick={showLogin}>Login</button>
          <button className={`home-page__button ${!isLoginVisible ? "show" : ""}`} type="button" onClick={hiddenLogin}> Register</button>
        </div>
        <div className='home-page__forms'>
        
              <Login />
              
              <Register />
              
        </div>
      </div>
    </div>
  );
};

export default HomePage;