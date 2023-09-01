import React, { useContext, useState } from 'react';
import './styles.scss';
import { ToastContainer } from 'react-toastify';
import { LoginContext } from '../../utils/providers/useLoginProvider';
import { UserContext } from '../../utils/providers/useUserProvider';

const Login = () => {
  const [emailLogin, setEmailLogin] = useState(''); // Initialize to null
  const [passwordLogin, setPasswordLogin] = useState(''); // Initialize to null
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    throw new Error('Task must be used within a themeProvider');
  }

  const { isLoginVisible } = loginContext;

  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('Task must be used within a themeProvider');
  }

  const { login } = userContext;

  const handleEmailChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailLogin(e.target.value);
  };

  const handlePasswordChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordLogin(e.target.value);
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ emailLogin, passwordLogin });
  };

  return (
    <div className={`login ${isLoginVisible ? 'show' : ''}`}>
      <form
        className="login__form"
        action="#"
        method="post"
        onSubmit={handleLogin}
      >
        <label htmlFor="emailLogin"><b>Email</b></label>
        <input
          className="login__email"
          type="email"
          placeholder="Email"
          name="emailLogin"
          required
          onChange={handleEmailChangeLogin}
          value={emailLogin}
        />

        <label htmlFor="passwordLogin"><b>Password</b></label>
        <input
          className="login__password"
          type="password"
          placeholder="Password"
          name="passwordLogin"
          required
          onChange={handlePasswordChangeLogin}
          value={passwordLogin}
        />

        <button
          className="login__submit"
          type="submit"
        >Login
        </button>
        <ToastContainer />
      </form>
      <button
        type="button"
        className="login__forgot"
      >
        <span>
          <a href="#">Forgot password ?</a>
        </span>
      </button>
    </div>
  );
};

export default Login;
