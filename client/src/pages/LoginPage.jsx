/* eslint-disable react/prop-types */
import { useEffect } from 'react';
const LoginPage = ({ setLoading }) => {
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