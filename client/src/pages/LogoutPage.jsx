/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/api';

const LogoutPage = ({setUser, setLoggedIn}) => {
  const navigateTo = useNavigate();
  useEffect(() => {
    logout()
      .then(() => {
        setUser(null);
        setLoggedIn(false);
        navigateTo('/login');
      })
      .catch((error) => {
        throw error
      })
  }, []);

  return (
    <></>
  );
};

export default LogoutPage;