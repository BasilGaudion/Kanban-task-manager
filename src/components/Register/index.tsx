import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import './styles.scss';
import { ToastContainer, toast } from 'react-toastify';
import { UserContext } from '../../utils/providers/useUserProvider';
import { ModalContext } from '../../utils/providers/useModalProvider';
import 'react-toastify/dist/ReactToastify.css';

interface RegisterProps {
  handleClose: () => void;
  isOpen: boolean;
}

const Register: React.FC<RegisterProps> = ({ handleClose, isOpen }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [containerAnimation, setContainerAnimation] = useState('pop-in');
  const [modalAnimation, setModalAnimation] = useState('modal-open');
  const [email, setEmail] = useState(''); // Initialize to null
  const [password, setPassword] = useState(''); // Initialize to null
  const [passwordConfirm, setPasswordConfirm] = useState(''); // Initialize to null
  const modalContext = useContext(ModalContext);

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

  if (!modalContext) {
    throw new Error('Task must be used within a ModalProvider');
  }

  const { showLogin, setShowLogin } = modalContext;

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

  const handleShowLogin = () => {
    setContainerAnimation('pop-out');
    setModalAnimation('modal-closed');
    setTimeout(() => {
      setShowLogin(!showLogin);
      handleClose();
    }, 250);
  };

  return (
    <div className={`register ${modalAnimation} 'isLightTheme'`}>
      <section className={`register__container ${containerAnimation}`} ref={ref}>
        <form
          className="register__form"
          action="#"
          method="post"
          onSubmit={handleSubmit}
        >
          <label htmlFor="email"><b>Email</b></label>
          <input
            className="register__input"
            type="email"
            placeholder="Enter email"
            name="email"
            required
            onChange={handleEmailChange}
            value={email}
          />

          <label htmlFor="password"><b>Password</b></label>
          <input
            className="register__input"
            type="password"
            placeholder="Enter password"
            name="password"
            onChange={handlePasswordChange}
            value={password}
            required
          />

          <label htmlFor="passwordConfirmation"><b>Confirm password</b></label>
          <input
            className="register__input"
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
        <button
          type="button"
          className="login__register"
          onClick={handleShowLogin}
        >
          Already have an account?
        </button>
      </section>
    </div>
  );
};

export default Register;
