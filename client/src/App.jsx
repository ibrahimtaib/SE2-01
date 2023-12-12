/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "@yaireo/tagify/dist/tagify.css";
import { useEffect, useState } from 'react';
import "react-datetime/css/react-datetime.css";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import API from './API';
import CallbackLogin from "./components/CallbackLogin";
import DefaultRoute from './components/DefaultRoute';
import Header from './components/Header';
import NavBar from './components/NavBar';
import ApplyPage from './pages/ApplyPage';
import InsertPage from './pages/InsertPage';
import LoginPage from './pages/LoginPage';
import LogoutPage from "./pages/LogoutPage";
import MainPage from './pages/MainPage';
import StudentApplicationsPage from './pages/StudentApplicationPage';


import './App.css';


import { getUserInfo } from "./api/api";
import LoadingSpinner from "./components/LoadingSpinner";
import StudentDetailsPage from "./pages/StudentDetailsPage";
import StudentRequestPage from "./pages/StudentRequestPage";
import ApplicationsPage from "./pages/applicationsPage";
import ApplicationsPage_secretary from "./pages/applicationsPage_Secretary";

function App() {

  const proposalStateMock = {
    title: "Thesis Proposal Title",
    description: "This is a thesis description, it contains information about the thesis. This should be filled with relevant information that the student must know before applying to the thesis proposal.",
    expiration: "2024-12-31",
    degree: {
      COD_DEGREE: "0"
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
  //This is the proposal to send to InsertForm
  const [proposalToInsert, setProposalToInsert] = useState(proposalStateMock);

  //FIXME: This state, we should put it in the correct component to be loaded after login
  const [ProposalsList, setProposalsList] = useState([]);

  const refetchDynamicContentTeacher = async (teacherId) => {
    API.getTeacherProposals(teacherId).then((proposals) => setProposalsList(proposals));
  }

  const refetchDynamicContentSecretary = async () => {
    API.getAllProposals.then((proposals) => setProposalsList(proposals));
  }


  const resetProposal = () => {
    setProposalToInsert(proposalStateMock);
    setUpdate(false);
  }

  useEffect(() => {
    const init = async () => {
      try {
        const userInfo = await getUserInfo();
        setLoggedIn(true);
        setUser(userInfo);

        if (userInfo && userInfo.role === "teacher") {
          const teacherId = userInfo.id;
          const proposals = await API.getTeacherProposals(teacherId);
          setProposalsList(proposals);
          // Codice per teacher
          setLoading(false);
        } else if (userInfo && userInfo.role === "student") {
          const proposals = await API.getProposalsByCds(userInfo.cds);
          setProposalsList(proposals);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error in init:", error);
        setLoggedIn(false);
        setUser(null);
        setLoading(false);
      }
    };
    init();
    console.log(proposalToInsert.degree.COD_DEGREE);
  }, []);

  if (!loggedIn && loading) {
    return (<LoadingSpinner />);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeaderPage user={user} resetProposal={resetProposal} />}>
          <Route path="/login" element={<LoginPage loggedIn={loggedIn} setLoading={setLoading} />} />
          <Route path="/*" element={<DefaultRoute />} />
          <Route path="/idp/profile/SAML2/Redirect" element={<CallbackLogin setUser={setUser} />} />
          <Route
            path="/"
            element={
              loggedIn ? (
                <MainPage user={user} ProposalsList={ProposalsList} setProposalsList={setProposalsList} setUpdate={setUpdate} setProposalToInsert={setProposalToInsert} refetchDynamicContent={refetchDynamicContentTeacher} />
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
          {user?.role === "student" ? (
            <>
              <Route path="/student/applications" element={<StudentApplicationsPage user={user} />} />
              <Route path="/student/requestForm" element={loggedIn ?(<StudentRequestPage user={user}/>):(<Navigate to="/login" />)}></Route>
              <Route path="/students/:id" element={loggedIn ? (<StudentDetailsPage />) : (
                <Navigate to="/login" />
              )} />
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
          ):(
            <>
              <Route path="/add" element={<InsertPage refetchDynamicContent={refetchDynamicContentTeacher} user={user} loading={loading} update={update} setLoading={setLoading} proposalToInsert={proposalToInsert} />} />
              <Route path="/applications/*" element={<ApplicationsPage user={user} />} />
              <Route path="/students/:id" element={<StudentDetailsPage />} />
              <Route path="thesis-requests/*" element={<ApplicationsPage_secretary user={user} />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );

}

function HeaderPage({ user, resetProposal }) {
  return (
    <>
      <Header />
      <NavBar user={user} resetProposal={resetProposal} />
      <Outlet />
    </>
  )
}

export default App