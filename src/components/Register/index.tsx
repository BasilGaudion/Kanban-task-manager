import React, { useContext, useState } from 'react';
import './styles.scss';
import { ToastContainer, toast } from 'react-toastify';
import { LoginContext } from '../../utils/providers/useLoginProvider';
import { UserContext } from '../../utils/providers/useUserProvider';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [email, setEmail] = useState(''); // Initialize to null
  const [password, setPassword] = useState(''); // Initialize to null
  const [passwordConfirm, setPasswordConfirm] = useState(''); // Initialize to null
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    throw new Error('Task must be used within a themeProvider');
  }

  const { isLoginVisible } = loginContext;

  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('Task must be used within a themeProvider');
  }

  const { signIn } = userContext;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === passwordConfirm) {
      signIn({ email, password });
    }
    else {
      toast.error('Passwords do not match', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      // throw new Error('Passwords do not match');
    }
  };

  return (
    <div className={`register ${!isLoginVisible ? 'show' : ''}`}>
      <form
        className="register__form"
        action="#"
        method="post"
        onSubmit={handleSubmit}
      >
        <label htmlFor="email"><b>Email</b></label>
        <input
          className="register__email"
          type="email"
          placeholder="Enter email"
          name="email"
          required
          onChange={handleEmailChange}
          value={email}
        />

        <label htmlFor="password"><b>Password</b></label>
        <input
          className="register__password"
          type="password"
          placeholder="Enter password"
          name="password"
          onChange={handlePasswordChange}
          value={password}
          required
        />

        <label htmlFor="passwordConfirmation"><b>Confirm password</b></label>
        <input
          className="register__password"
          type="password"
          placeholder="Enter password"
          name="password"
          onChange={handlePasswordConfirmChange}
          value={passwordConfirm}
          required
        />

        <button className="register__submit" type="submit">Register</button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default Register;
