import React from 'react';
import './styles.scss';
import { LogoDark } from '../../assets';

const HomeDescription = () => {
  return (
    <div className="home-description">
      <img src={LogoDark} className="home-description__logo" alt="Mobile Logo" />
      <h1 className="home-description__title">
        <span>Kanban</span>, an Innovative Solution for Effective Project Management
      </h1>
      <p className="home-description__intro">
        Create customized <span className="home-description__highlight">Kanban boards</span> for each project. Organize your tasks into columns, from planning to execution, through validation and delivery.
      </p>
      <p className="home-description__intro">
        Move your tasks from one column to another with a simple <span className="home-description__highlight">drag-and-drop</span>. This makes managing the progress of your projects a breeze.
      </p>
      <p className="home-description__intro">
        Add details to tasks, including <span className="home-description__highlight">descriptions</span>, <span className="home-description__highlight">sub-tasks</span>, <span className="home-description__highlight">color codes</span>, and more. Ensure that nothing is overlooked.
      </p>
    </div>

  );
};

export default HomeDescription;
