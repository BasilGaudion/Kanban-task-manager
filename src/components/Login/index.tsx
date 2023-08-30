import React, { useContext } from 'react';
import './styles.scss';
import { LoginContext } from "../../utils/providers/useLoginProvider";

const Login = () => {
    const loginContext = useContext(LoginContext);

    if (!loginContext) {
      throw new Error("Task must be used within a themeProvider");
    }
  
    const {isLoginVisible, setIsLoginVisible} = loginContext;

    return (
        <div className={`login ${isLoginVisible ? "show" : ""}`} >
            <form className="login__form" action="#" method="post">
                <label htmlFor="email"><b>Email</b></label>
                <input className='login__email' type="email" placeholder="Email" name="email" required />

                <label htmlFor="password"><b>Password</b></label>
                <input className='login__password' type="password" placeholder="Password" name="password" required />

                <button className='login__submit' type="submit">Login</button>
            </form>
            <button type="button" className="login__forgot">
                <span>
                    <a href="#">Forgot password ?</a>
                </span>
            </button>
        </div>
    );
};

export default Login;
