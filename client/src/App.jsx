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
import { getUserInfo } from "./api/api";
import LoadingSpinner from "./components/LoadingSpinner";
import StudentApplicationsPage from "./pages/StudentApplicationsPage";

function App() {

  const proposalStateMock = {
    title: "Thesis Proposal Title",
    description: "This is a thesis description, it contains information about the thesis. This should be filled with relevant information that the student must know before applying to the thesis proposal.",
    expiration: "2024-12-31",
    degree :{
      COD_DEGREE : "0"
    },
    level: "Master", 
    type: "Experimental",
    coSupervisors: ["s654321@polito.it", "externalsup@polito.it"], 
    requiredKnowledge: "sample",
    keywords: ["keywordsample"], 
  };

  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  //This is the proposal to send to InsertForm, it will contain 
  const [proposalToInsert, setProposalToInsert] = useState(proposalStateMock);

  //FIXME: This state, we should put it in the correct component to be loaded after login
  const [ProposalsList, setProposalsList] = useState([]);

  const handleErrors = (err) => {
    let msg = '';
    if (err.error) msg = err.error;
    else if (String(err) === "string") msg = String(err);
    else msg = "Unknown Error";
    setMessage(msg);
  }

  const resetProposal = () => {
    setProposalToInsert(proposalStateMock);
    setUpdate(false);
  }

  //FIXME: This has to be put in MainPage (WE SHOULD CHANGE THAT NAME!)
  useEffect(() => {

    const init = async () => {
      try {
        const userInfo = await getUserInfo();
        setLoggedIn(true);
        setUser(userInfo);
        try {
          const proposals = await API.getAllProposals();
          setProposalsList(proposals);

          if (userInfo.role === 'teacher') {
            const teacherId = userInfo.id;
            const teacherProposals = await API.getTeacherProposals(teacherId);
            setProposalsList(teacherProposals);
          } else {
            const proposals = await API.getProposalsByCds(userInfo.cds);
            setProposalsList(proposals);
          }
          setLoading(false);
        } catch (proposalError) {
          console.error("Error fetching proposals:", proposalError);
        }
      } catch (err) {
        setLoggedIn(false);
        setUser(null);
        setLoading(false);
        console.log(err);
      }
    };
    init();
    console.log(proposalToInsert.degree.COD_DEGREE);
  }, []);

  if (loading) {
    return (<LoadingSpinner />);
  }

  return (
    <BrowserRouter>
      <Header/>
      <NavBar user={user} resetProposal={resetProposal} />
      <Routes>
        <Route path="/login" element={<LoginPage loggedIn={loggedIn} />} />
        <Route path="/*" element={<DefaultRoute />} />
        <Route path="/student/applications" element={<StudentApplicationsPage user={user}/>} />
        <Route path="/idp/profile/SAML2/Redirect" element={<CallbackLogin setUser={setUser} />} />
        <Route
          path="/"
          element={
            loggedIn ? (
              <MainPage user={user} ProposalsList={ProposalsList} setProposalsList={setProposalsList} setUpdate={setUpdate} setProposalToInsert={setProposalToInsert}/>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/logout"
          element={
            loggedIn ? (
              <LogoutPage setUser={setUser} setLoggedIn={setLoggedIn} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        {user?.role === "student" && (
          <>
            <Route path="/students/:id" element={<StudentDetailsPage />} />
            <Route
              path="/proposals/:proposalId/apply"
              element={
                loggedIn ? (
                  <ApplyPage user={user} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </>
        )}
        {user?.role === "teacher" && (
          <>
            <Route path="/add" element={<InsertPage user={user} loading={loading} update={update} setLoading={setLoading} proposalToInsert={proposalToInsert}/>} />
            <Route path="/applications/*" element={<ApplicationsPage user={user} />} />
            <Route path="/students/:id" element={<StudentDetailsPage />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );

}

export default App