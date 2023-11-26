/* eslint-disable no-unused-vars */
import "@yaireo/tagify/dist/tagify.css";
import { useEffect, useState } from 'react';
import "react-datetime/css/react-datetime.css";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import API from './API';
import DefaultRoute from './components/DefaultRoute';
import Header from './components/Header';
import NavBar from './components/NavBar';
import ApplyPage from './pages/ApplyPage';
import InsertPage from './pages/InsertPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import LogoutPage from "./pages/LogoutPage";
import CallbackLogin from "./components/CallbackLogin";


import './App.css';


import ApplicationsPage from "./pages/applicationsPage";
import StudentDetailsPage from "./pages/StudentDetailsPage";

function App() {
  const [user, setUser] = useState(null);

  const [message, setMessage] = useState('');

  //FIXME: This state, we should put it in the correct component to be loaded after login
  const [ProposalsList, setProposalsList] = useState([]);

  const handleErrors = (err) => {
    let msg = '';
    if (err.error) msg = err.error;
    else if (String(err) === "string") msg = String(err);
    else msg = "Unknown Error";
    setMessage(msg);
  }


  //FIXME: This has to be put in MainPage (WE SHOULD CHANGE THAT NAME!)
  useEffect(() => {
    const init = async () => {
      API.getAllProposals().then((a) => {
        setProposalsList(a)
      })
        .catch((err) => console.log("error fetching proposals", err));

    };

    init();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <NavBar user={user} />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<DefaultRoute />} />
        <Route path="/idp/profile/SAML2/Redirect" element={<CallbackLogin setUser={setUser} />} />
        <Route
          path="/"
          element={
            user ? (
              <MainPage user={user} ProposalsList={ProposalsList} setProposalsList={setProposalsList} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/logout"
          element={
            user ? (
              <LogoutPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/proposals/:proposalId/apply"
          element={
            user ? (
              <ApplyPage user={user} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        {user?.role === "teacher" && (
          <>
            <Route path="/add" element={<InsertPage user={user} />} />
            <Route path="/applications/*" element={<ApplicationsPage />} />
            <Route path="/students/:id" element={<StudentDetailsPage />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );

}

export default App