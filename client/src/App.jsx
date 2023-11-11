import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { React, useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useNavigate, Navigate } from 'react-router-dom';
import { Col, Container, Row, Spinner, Toast } from 'react-bootstrap';
import DefaultRoute from './components/DefaultRoute';
import './App.css'
import { UserContext, MessageContext, DirtyContext } from './Context';
import MainPage from './pages/MainPage';

function App() {

  // This state keeps track if the user is currently logged-in.
  const [loggedIn, setLoggedIn] = useState(false);
  // This state contains the user's info.
  const [user, setUser] = useState(null);

  const [message, setMessage] = useState('');

  const handleErrors = (err) => {
    let msg = '';
    if (err.error) msg = err.error;
    else if (String(err) === "string") msg = String(err);
    else msg = "Unknown Error";
    setMessage(msg);
  }

  return (
    <BrowserRouter>
      <Container fluid className="App p-0">
        <Routes>
          <Route path='/' element={<MainPage/>}></Route>
          <Route path='/*' element={<DefaultRoute />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App
