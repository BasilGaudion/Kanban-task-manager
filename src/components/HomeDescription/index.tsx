import React from 'react';
import './styles.scss';
import { LogoDark, HomeBG, HomeGradient } from '../../assets';

const HomeDescription = () => {
  return (
    <div className="home-description">
      <header className="home-description__header">
        <img src={LogoDark} className="home-description__logo" alt="Mobile Logo" />
        <div className="home-description__authentification">
          <button type="button" className="home-description__button">Login</button>
          <button type="button" className="home-description__button">Register</button>
        </div>
      </header>
      <div className="home-description__image">
        <h1 className="home-description__title">
          <span>Kanban</span>, an Innovative Solution for Effective Project Management
        </h1>
        <p className="home-description__intro">
          Create custom Kanban boards for projects. Organize tasks from planning to delivery. Drag-and-drop tasks to track progress. Add details so you don't miss anything.
        </p>
        <img src={HomeBG} alt="" />
      </div>
      <img className="home-description__gradient" src={HomeGradient} alt="" />
      <button type="button" className="home-description__register">
        Register Now
      </button>
    </div>

  );
};

export default HomeDescription;
