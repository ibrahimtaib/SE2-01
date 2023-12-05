import React, { useEffect } from 'react';
const LoginPage = ({ loggedIn, setUser, setLoading }) => {
  setLoading(true);

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