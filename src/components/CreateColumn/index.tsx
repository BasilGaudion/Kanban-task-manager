import React, { useContext } from 'react';
import './styles.scss';
import { ModalContext } from '../../utils/providers/useModalProvider';
import { ThemeContext } from '../../utils/providers/useThemeProvider';

const CreateColumn = () => {
  const modalContext = useContext(ModalContext);
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('Task must be used within a themeProvider');
  }

  const { isDarkTheme } = themeContext;

  if (!modalContext) {
    throw new Error('Task must be used within a ModalProvider');
  }

  const { showAddColumn, setShowAddColumn } = modalContext;

  const handleShowAddColumn = () => {
    setShowAddColumn(!showAddColumn);
  };

  return (
    <section className={`create-column ${isDarkTheme ? 'isDarkTheme' : 'isLightTheme'}`} onClick={handleShowAddColumn}>
      <h5 className="create-column__title">+ New Column</h5>
    </section>
  );
};

export default CreateColumn;
