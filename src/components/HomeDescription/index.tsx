import React from 'react';
import './styles.scss';
import { LogoDark } from '../../assets';

const HomeDescription = () => {
  return (
    <div className='home-description'>
      <img src={LogoDark} className="home-description__logo" alt="Logo Mobile" />
      <h1 className='home-description__title'><span>Kaban</span>, une solution innovante pour une gestion de groupe efficace</h1>
      <p className='home-description__intro'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed nulla quis urna ultrices sollicitudin. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris id metus nec nisl pharetra ultricies. Mauris rutrum lorem sed bibendum ultrices. Sed tincidunt placerat lacinia. In mattis, tellus at malesuada lacinia, turpis risus lacinia nulla, eu feugiat nisi orci et neque. Quisque euismod nulla molestie pulvinar luctus..</p>
    </div>
  );
};

export default HomeDescription;