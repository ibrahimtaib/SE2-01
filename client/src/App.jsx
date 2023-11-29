/* eslint-disable no-unused-vars */
import "@yaireo/tagify/dist/tagify.css";
import { useEffect, useState } from 'react';
import "react-datetime/css/react-datetime.css";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import API from './API';
import DefaultRoute from './components/DefaultRoute';
import Header from './components/Header';
import NavBar from './components/NavBar';
import ApplyPage from './pages/ApplyPage';
import InsertPage from './pages/InsertPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';


import './App.css';


import ApplicationsPage from "./pages/applicationsPage";
import StudentDetailsPage from "./pages/StudentDetailsPage";

function App() {

  // This state keeps track if the user is currently logged-in.
  // eslint-disable-next-line no-unused-vars
  //FIXME: login!
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
  /*
    useEffect(() => {
      const init = async () => {
        API.getAllProposals().then((a) => {
          setProposalsList(a)
        })
          .catch((err) => console.log("error fetching proposals", err));
  
      };
  
      init();
    }, []);*/

  useEffect(() => {
    const fetchData = async () => {
      try {
        const proposals = await API.getAllProposals();
        setProposalsList(proposals);

        if (user?.role === 'teacher') {
          const teacherId = user.teacherId;
          const teacherProposals = await API.getTeacherProposals(teacherId);
          setProposalsList(teacherProposals);
        }
      } catch (error) {
        console.log("Error fetching proposals:", error);
      }
    };

    fetchData();
  }, [user]); // Adding props.user.teacherId as a dependency



  return (
    <BrowserRouter>
      <Header />
      <NavBar user={user} />
      <Routes>
        <Route
          exact
          path="/"
          element={
            user === null ? (
              <Navigate replace to="/login" />
            ) : (
              <MainPage user={user} ProposalsList={ProposalsList} setProposalsList={setProposalsList} />
            )
          }
        />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/add" element={
          user === null ? <Navigate replace to="/login" /> : <InsertPage isLoggedIn={loggedIn} />} />
        <Route
          exact
          path='/applications/*'
          element={user === undefined ? <Navigate replace to="/login" /> : user?.role === "teacher" ? <ApplicationsPage /> : <MainPage user={user} ProposalsList={ProposalsList} setProposalsList={setProposalsList} />}
        />
        <Route path="/students/:id" element={<StudentDetailsPage />} />
        <Route path="proposals/:proposalId/apply" element={<ApplyPage user={user} />} />
        <Route path='/*' element={<DefaultRoute />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App