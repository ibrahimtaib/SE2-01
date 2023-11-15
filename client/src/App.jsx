/* eslint-disable no-unused-vars */
import "@yaireo/tagify/dist/tagify.css";
import { useEffect, useState } from 'react';
import "react-datetime/css/react-datetime.css";
import { BrowserRouter, useNavigate } from 'react-router-dom';
import './App.css';
import ApplicationsList from './components/BrowseApplications';
import Header from './components/Header';
import NavBar from './components/NavBar';
import ProposalDetails from './components/ProposalDetails';
import StudentDetails from './components/StudentDetails';

function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  )
}

function Main() {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import API from './API';

import DefaultRoute from './components/DefaultRoute';
import InsertPage from './pages/InsertPage';
import MainPage from './pages/MainPage';

import './App.css';

function App() {

  // This state keeps track if the user is currently logged-in.
  // eslint-disable-next-line no-unused-vars
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
    const fetchData = async () => {
      try {
        const applicationsData = await API.getApplicationsByTeacherId(1);  
        setApplications(applicationsData);
      } catch (error) {
        console.error(error);
      }
    const init = async () => {
        API.getAllProposals().then((a) => {
          setProposalsList(a)
        })
        .catch((err) => console.log("error fetching proposals", err));
  
    };

    fetchData();
  }, []);
  
  return (
    <>
      <Header />
      <NavBar />
      
      <Routes>
        <Route path="/applications/"  element={<ApplicationsList data={applications} />} />
        <Route path="/applications/proposal/:id" element={<ProposalDetails />} />
        <Route path="/applications/student/:id" element={<StudentDetails />} />
      </Routes>
    </>
  );
}
    <BrowserRouter>
      <Routes>
        <Route path="/add" element={<InsertPage isLoggedIn={loggedIn} />}/>
          <Route path='/' element={<MainPage ProposalsList={ProposalsList} setProposalsList={setProposalsList}/>}></Route>
          <Route path='/*' element={<DefaultRoute />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
