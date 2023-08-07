import React, { useContext } from 'react';
import './styles.scss';
import { ThemeContext } from "../../utils/providers/useThemeProvider";

const CreateColumn = () => {

  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("Task must be used within a themeProvider");
  }

  const {isDarkTheme} = themeContext;

  return (
    <section className={`create-column ${isDarkTheme ? 'isDarkTheme' : 'isLightTheme'}`} >
      <h5 className='create-column__title'>+ New Column</h5>
    </section>
  );
};

export default CreateColumn;