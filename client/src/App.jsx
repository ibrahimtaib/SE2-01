import "@yaireo/tagify/dist/tagify.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import "react-datetime/css/react-datetime.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import API from './API';

import DefaultRoute from './components/DefaultRoute';
import InsertPage from './pages/InsertPage';
import MainPage from './pages/MainPage';

import './App.css';

function App() {

  // This state keeps track if the user is currently logged-in.
  const [loggedIn, setLoggedIn] = useState(false);
  // This state contains the user's info.
  const [user, setUser] = useState(null);

  const [message, setMessage] = useState('');

  const [ProposalsList, setProposalsList] = useState([]);

  const handleErrors = (err) => {
    let msg = '';
    if (err.error) msg = err.error;
    else if (String(err) === "string") msg = String(err);
    else msg = "Unknown Error";
    setMessage(msg);
  }

  useEffect(() => {
    const init = async () => {
      try {
        API.getAllProposals().then((a) => {
          setProposalsList(a)
        })
          .catch((err) => console.log(err));
      } catch (err) {

      }
    };
    init();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/add" element={<InsertPage isLoggedIn={loggedIn} />}/>
        <Container fluid className="App p-0">
          <Route path='/' element={<MainPage ProposalsList={ProposalsList} setProposalsList={setProposalsList}/>}></Route>
          <Route path='/*' element={<DefaultRoute />} />
        </Container>
      </Routes>
    </BrowserRouter>
  );
}


export default App
