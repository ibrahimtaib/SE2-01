/* eslint-disable react/prop-types */
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import styles from "./LoginPage.module.css";
const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@polito.it',
    role: 'teacher',
    };

const LoginPage = ({setUser}) => {
  const [email, setEmail] = useState('s123456@studenti.polito.it');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const navTo = useNavigate();
  const handleLogin = async () => {
    // Replace this with your actual authentication logic
    console.log('Email:', email);
    console.log('Password:', password);
    /*const user = await pi.login(email, password);

    if (user == undefined) {
      setShowAlert(true);
      return;
    } 
    if (user == null) {
      // an error occurred
      alert('An error occurred. Please try again later.');
    }*/
    setUser(mockUser);
    setShowAlert(false);
    navTo("/");    
  };

  return (
    <div className={styles["login-page"]}>
    <div className={styles["login-container"]}>
      <h2>Login</h2>
      <div className={styles["input-container"]}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles["input-container"]}>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className={styles["password-icon"]} onClick={handleTogglePassword}>
          {showPassword ? <FiEye /> : <FiEyeOff />}
        </span>
      </div>
      <span className={styles["alert"]} style={{display: showAlert ? 'block' : 'none'}}>Incorrect email or password</span>
      <button className={styles["login-btn" ]}onClick={handleLogin}>
        Login
      </button>
    </div>
    </div>
  );
};

export default LoginPage;