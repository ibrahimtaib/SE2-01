/* eslint-disable react/prop-types */
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import styles from "./LoginPage.module.css";
import Form from 'react-bootstrap/Form';
const mockUser = {
  id: 1,
  name: 'Mario Rossi',
  email: 's319095@studenti.polito.it',
  role: 'student',
};

const LoginPage = ({ setUser }) => {
  const [email, setEmail] = useState('s123456@studenti.polito.it');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  var teacher = 0;

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

    if (email === "s123456@polito.it") {
      mockUser.role = 'teacher';
      mockUser.name = 'Mario Professore'
      setUser(mockUser);
      setShowAlert(false);
      navTo("/");
    }
    else if (email === "s123456@studenti.polito.it") {
      mockUser.role = 'student';
      setUser(mockUser);
      setShowAlert(false);
      navTo("/");
    }
    else {
      alert('An error occurred. Please try again later.');
    }

  };


  return (
    <>
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
          <span className={styles["alert"]} style={{ display: showAlert ? 'block' : 'none' }}>Incorrect email or password</span>
          <button className={styles["login-btn"]} onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
      <div>
      </div>

    </>

  );
};

export default LoginPage;