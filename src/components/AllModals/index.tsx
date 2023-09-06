import React, { useContext } from 'react';
import './styles.scss';
import { ModalContext } from '../../utils/providers/useModalProvider';
import ModalViewTask from '../Modal/ModalViewTask';
import ModalAddTask from '../Modal/ModalAddTask';
import ModalEditTask from '../Modal/ModalEditTask';
import ModalViewBoard from '../Modal/ModalViewBoard';
import ModalAddBoard from '../Modal/ModalAddBoard';
import ModalEditBoard from '../Modal/ModalEditBoard';
import ModalAddColumn from '../Modal/ModalAddColumn';
import ModalDeleteTask from '../Modal/ModalDeleteTask';
import ModalDeleteBoard from '../Modal/ModalDeleteBoard';
import ModalEditColumn from '../Modal/ModalEditColumn';
import ModalDeleteColumn from '../Modal/ModalDeleteColumn';

const AllModals = () => {
  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    throw new Error('Task must be used within a ModalProvider');
  }

  const {
    showViewTask, setShowViewTask, showAddTask, setShowAddTask, showEditTask, setShowEditTask, showViewBoard, setShowViewBoard, showAddBoard, setShowAddBoard, showEditBoard, setShowEditBoard, showAddColumn, setShowAddColumn, showDeleteTask, setShowDeleteTask, showDeleteBoard, setShowDeleteBoard, showEditColumn, setShowEditColumn, showDeleteColumn, setShowDeleteColumn,
  } = modalContext;
  return (
    <>
      {showEditBoard && <ModalEditBoard handleClose={() => setShowEditBoard(false)} isOpen />}
      {showViewBoard && <ModalViewBoard handleClose={() => setShowViewBoard(false)} isOpen />}
      {showAddBoard && <ModalAddBoard handleClose={() => setShowAddBoard(false)} isOpen />}
      {showViewTask && <ModalViewTask handleClose={() => setShowViewTask(false)} isOpen />}
      {showAddTask && <ModalAddTask handleClose={() => setShowAddTask(false)} isOpen />}
      {showEditTask && <ModalEditTask handleClose={() => setShowEditTask(false)} isOpen />}
      {showAddColumn && <ModalAddColumn handleClose={() => setShowAddColumn(false)} isOpen />}
      {showDeleteTask && <ModalDeleteTask handleClose={() => setShowDeleteTask(false)} isOpen />}
      {showDeleteBoard && <ModalDeleteBoard handleClose={() => setShowDeleteBoard(false)} isOpen />}
      {showEditColumn && <ModalEditColumn handleClose={() => setShowEditColumn(false)} isOpen />}
      {showDeleteColumn && <ModalDeleteColumn handleClose={() => setShowDeleteColumn(false)} isOpen />}
    </>
  );
};

export default AllModals;
