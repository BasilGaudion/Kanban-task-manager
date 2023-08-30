import React, { useContext } from 'react';
import './styles.scss';
import { LoginContext } from "../../utils/providers/useLoginProvider";

const Register = () => {
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    throw new Error("Task must be used within a themeProvider");
  }

  const {isLoginVisible, setIsLoginVisible} = loginContext;

  return (
    <div className={`register ${!isLoginVisible ? "show" : ""}`} >
      <form className='register__form' action="#" method="post">
          <label htmlFor="email"><b>Email</b></label>
          <input className='register__email' type="email" placeholder="Enter email" name="email" required />

          <label htmlFor="password"><b>Password</b></label>
          <input className='register__password' type="password" placeholder="Enter password" name="password" required />

          <label htmlFor="passwordConfirmation"><b>Confirm password</b></label>
          <input className='register__password' type="password" placeholder="Confirm your password" name="passwordConfirmation" required />

          <button className='register__submit' type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;