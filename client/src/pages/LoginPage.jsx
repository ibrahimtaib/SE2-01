import React, { useEffect } from 'react';
const LoginPage = ({ loggedIn, setUser }) => {

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