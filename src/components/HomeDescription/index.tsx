import React, { useContext } from 'react';
import './styles.scss';
import { LogoDark, HomeBG, HomeGradient } from '../../assets';
import { ModalContext } from '../../utils/providers/useModalProvider';

const HomeDescription = () => {
  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    throw new Error('Task must be used within a ModalProvider');
  }

  const {
    showLogin, setShowLogin, showRegister, setShowRegister,
  } = modalContext;

  const handleShowLogin = () => {
    setShowLogin(!showLogin);
  };

  const handleShowRegister = () => {
    setShowRegister(!showRegister);
  };

  return (
    <div className="home-description">
      <header className="home-description__header">
        <img src={LogoDark} className="home-description__logo" alt="Mobile Logo" />
        <div className="home-description__authentification">
          <button
            type="button"
            className="home-description__button"
            onClick={handleShowLogin}
          >
            Login
          </button>
          <button
            type="button"
            className="home-description__button"
            onClick={handleShowRegister}
          >
            Register
          </button>
        </div>
      </header>
      <div className="home-description__image">
        <div className="home-description__content">
          <h1 className="home-description__title">
            <span>Kanban</span>, an Innovative Solution for Effective Project Management
          </h1>
          <p className="home-description__intro">
            Create custom Kanban boards for projects. Organize tasks from planning to delivery. Drag-and-drop tasks to track progress. Add details so you don't miss anything.
          </p>
        </div>
        <img src={HomeBG} alt="" />
      </div>
      <img className="home-description__gradient" src={HomeGradient} alt="" />
      <button
        type="button"
        className="home-description__register"
        onClick={handleShowRegister}
      >
        Register Now
      </button>
    </div>

  );
};

export default HomeDescription;
