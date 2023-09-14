import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import './styles.scss';
import { UserContext } from '../../utils/providers/useUserProvider';
import { ModalContext } from '../../utils/providers/useModalProvider';

interface LoginProps {
  handleClose: () => void;
  isOpen: boolean;
}

const Login: React.FC<LoginProps> = ({ handleClose, isOpen }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [containerAnimation, setContainerAnimation] = useState('pop-in');
  const [modalAnimation, setModalAnimation] = useState('modal-open');
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const modalContext = useContext(ModalContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setContainerAnimation('pop-in');
      setModalAnimation('modal-open');
    }
    else {
      setContainerAnimation('pop-out');
      setModalAnimation('modal-closed');
    }
  }, [isOpen]);

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setContainerAnimation('pop-out');
        setModalAnimation('modal-closed');
        setTimeout(handleClose, 300);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [handleClose]);

  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('Task must be used within a themeProvider');
  }

  const { login } = userContext;

  if (!modalContext) {
    throw new Error('Task must be used within a ModalProvider');
  }

  const { showRegister, setShowRegister } = modalContext;

  const handleEmailChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailLogin(e.target.value);
  };

  const handlePasswordChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordLogin(e.target.value);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await login({ emailLogin, passwordLogin });
    setLoading(false);
  };

  const handleShowRegister = () => {
    setContainerAnimation('pop-out');
    setModalAnimation('modal-closed');
    setTimeout(() => {
      setShowRegister(!showRegister);
      handleClose();
    }, 250);
  };

  return (
    <div className={`login ${modalAnimation} 'isLightTheme'`}>
      <section className={`login__container ${containerAnimation}`} ref={ref}>
        {loading
          ? <div className="loader" />
          : (
            <>
              <form
                className="login__form"
                action="#"
                method="post"
                onSubmit={handleLogin}
              >
                <label htmlFor="emailLogin"><b>Email</b></label>
                <input
                  className="login__input"
                  type="email"
                  placeholder="Email"
                  name="emailLogin"
                  required
                  onChange={handleEmailChangeLogin}
                  value={emailLogin}
                />

                <label htmlFor="passwordLogin"><b>Password</b></label>
                <input
                  className="login__input"
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
              </form>
              <button
                type="button"
                className="register__login"
                onClick={handleShowRegister}
              >
                Not registered ?
              </button>
            </>
          )}
      </section>
    </div>
  );
};

export default Login;
