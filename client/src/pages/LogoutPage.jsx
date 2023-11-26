import React, { useEffect } from 'react';
import { logout } from '../api/api';

const LogoutPage = ({setUser, setLoggedIn}) => {
  useEffect(() => {
    logout()
      .then((res) => {
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