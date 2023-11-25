/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { login } from '../api/api';
const user = {name: "Sono Dentro!", email: "s123456@studenti.polito.it", id: 1}


const LoginPage = ({ setUser }) => {
  const navigateTo = useNavigate();

  useEffect(() => {
    window.location.href = 'http://localhost:3001/login';
  }, []);


  return (
    <>
      <div>
      </div>
    </>

  );
};

export default LoginPage;