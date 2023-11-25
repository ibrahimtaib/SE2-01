import React, { useEffect } from 'react';
import { logout } from '../api/api';

const LogoutPage = () => {
  useEffect(() => {
    logout()
      .then((res) => {
        console.log(res);
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